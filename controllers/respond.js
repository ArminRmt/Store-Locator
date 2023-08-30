const db = require("../config/db.config.js");
const Respond = db.Respond;
const Shop = db.Shop;
const Request = db.Request;
const { io, userSockets } = require("../socketManager.js");
const shop = require("./shop.js");
const { getSellerShopLocationAndName } = require("./shop.js");

// get seller reponds
exports.GetSellerResponds = async (req, res) => {
  const SellerId = req.userId;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;

  const offset = (page - 1) * pageSize;

  try {
    const responds = await Respond.findAll({
      attributes: ["id", "request_id", "price", "seller_respond", "timestamp"],
      where: {
        seller_id: SellerId,
      },
      order: [["timestamp", "DESC"]],
      limit: pageSize,
      offset: offset,
    });

    res.status(200).json(responds);
  } catch (err) {
    console.error("Error fetching user requests:", err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

// get user responds
exports.getUserResponses = async (req, res) => {
  const userId = req.userId;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;

  const offset = (page - 1) * pageSize;

  try {
    const userResponses = await Respond.findAll({
      where: {
        is_deleted: false,
      },
      include: [
        {
          model: Request,
          where: { users_id: userId },
          attributes: [],
        },
      ],
      attributes: [
        "id",
        "seller_id",
        "request_id",
        "price",
        "seller_respond",
        "timestamp",
      ],
      order: [["timestamp", "DESC"]],
      limit: pageSize,
      offset: offset,
    });

    const sellerIds = userResponses.map((response) => response.seller_id);

    const shopLocations = {};
    try {
      for (const sellerId of sellerIds) {
        const { shopLatitude, shopLongitude, shopName } =
          await getSellerShopLocationAndName(sellerId);
        shopLocations[sellerId] = { shopLatitude, shopLongitude, shopName };
      }
    } catch (error) {
      console.error("Error fetching shop locations:", error.message);
      return res.status(400).json({ error: error.message });
    }

    const combinedData = userResponses.map((response) => ({
      ...response.dataValues,
      shopLatitude: shopLocations[response.seller_id].shopLatitude,
      shopLongitude: shopLocations[response.seller_id].shopLongitude,
      shopName: shopLocations[response.seller_id].shopName,
    }));

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching user responses:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

// get user responds for specific request
exports.UserRequestResponses = async (req, res) => {
  const requestId = req.body;
  const userId = req.userId;

  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const offset = (page - 1) * pageSize;

  try {
    const userResponses = await Respond.findAll({
      where: {
        users_id: userId,
        request_id: requestId,
        is_deleted: false,
      },
      attributes: [
        "id",
        "seller_id",
        "request_id",
        "price",
        "seller_respond",
        "timestamp",
      ],
      order: [["timestamp", "DESC"]],
      limit: pageSize,
      offset: offset,
    });

    const sellerIds = userResponses.map((response) => response.seller_id);

    const shopLocations = {};
    try {
      for (const sellerId of sellerIds) {
        const { shopLatitude, shopLongitude, shopName } =
          await getSellerShopLocationAndName(sellerId);
        shopLocations[sellerId] = { shopLatitude, shopLongitude, shopName };
      }
    } catch (error) {
      console.error("Error fetching shop locations:", error.message);
      return res.status(400).json({ error: error.message });
    }

    const combinedData = userResponses.map((response) => ({
      ...response.dataValues,
      shopLatitude: shopLocations[response.seller_id].shopLatitude,
      shopLongitude: shopLocations[response.seller_id].shopLongitude,
      shopName: shopLocations[response.seller_id].shopName,
    }));

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching user and request responses:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.createResponse = async (req, res) => {
  try {
    const { request_id, buyerID, price, seller_respond } = req.body;
    // const buyerID = req.body.user_id;
    const SellerId = req.userId;
    const timestamp = new Date().toISOString();

    const newResponse = await Respond.create({
      seller_id: SellerId,
      request_id: request_id,
      price: price,
      seller_respond: seller_respond,
      timestamp: timestamp,
      is_deleted: false,
    });

    // get Seller shop location
    const shop = await Shop.findOne({ where: { seller_id: SellerId } });
    if (!shop) {
      res.status(400).json({ error: "فروشگاهی به نام این فروشنده پیدا نشد" });
    }
    const shopLatitude = shop.latitude;
    const shopLongitude = shop.longitude;
    const shopName = shop.name;

    // Emit an event to the specific user
    const userSocketId = userSockets[buyerID];

    socketRes = {
      seller_id: SellerId,
      request_id: request_id,
      price: price,
      seller_respond: seller_respond,
      timestamp: timestamp,
      shopLatitude: shopLatitude,
      shopLongitude: shopLongitude,
      shopName: shopName,
    };

    if (userSocketId) {
      io.to(userSocketId).emit("newResponse", socketRes);
    }

    const result = {
      msg: "پاسخ با موفقیت ارسال شد",
      id: newResponse.id,
      request_id: newResponse.request_id,
      price: newResponse.price,
      seller_respond: newResponse.seller_respond,
      timestamp: newResponse.timestamp,
      shopLatitude,
      shopLongitude,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error creating response:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.UpdateResponse = async (req, res) => {
  const { response_id, price, seller_respond } = req.body;
  const timestamp = new Date().toISOString();

  try {
    const [rowsAffected, [updatedResponse]] = await Respond.update(
      {
        price,
        seller_respond,
        timestamp: timestamp,
      },
      {
        returning: true,
        where: {
          id: response_id,
          users_id: req.userId,
        },
      }
    );

    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ msg: "پاسخ پیدا نشد یا شما مجوز به‌روزرسانی ندارید" });
    }

    const request = await Request.findOne({
      where: { id: updatedResponse.request_id },
    });

    const shop = await Shop.findOne({
      attributes: ["name"],
      where: { seller_id: updatedResponse.seller_id },
    });

    if (!shop) {
      return res.status(404).json({ msg: "فروشنده مرتبط یافت نشد" });
    }
    const shopName = shop.name;

    // Emit an event to the specific user
    const userSocketId = userSockets[request.users_id];
    if (userSocketId) {
      io.to(userSocketId).emit("responseUpdated", {
        response_id,
        price,
        seller_respond,
        timestamp,
        shopName,
      });
    }

    res.status(200).json({
      msg: "پاسخ به‌روزرسانی شد",
      response_id,
      price,
      seller_respond,
      timestamp,
    });
  } catch (error) {
    console.error("Error updating response:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.DeleteResponse = async (req, res) => {
  const { response_id } = req.body;

  try {
    const response = await Respond.findOne({
      where: {
        id: response_id,
        users_id: req.userId,
      },
    });

    if (!request) {
      return res
        .status(404)
        .json({ message: "پاسخ یافت نشد یا شما مجوز حذف آن را ندارید." });
    }

    const request = await Request.findOne({
      where: { id: response.request_id },
    });

    const userSocketId = userSockets[request.users_id];
    if (userSocketId) {
      io.to(userSocketId).emit("responseDeleted", {
        response_id,
      });
    }

    await response.destroy();

    res.status(200).json({ msg: "پاسخ حذف شد", response_id });
  } catch (error) {
    console.error("Error deleting response:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

// Buyer panel - Delete a response
exports.deleteUserResponse = async (req, res) => {
  try {
    const { response_id } = req.body;

    await Respond.update({ is_deleted: true }, { where: { id: response_id } });

    // res.status(200).json({ message: "پاسخ با موفقیت حذف شد." });
    res.sendStatus(204); // Send a 'No Content' status code
  } catch (error) {
    console.error("Error deleting response:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
