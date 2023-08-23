const db = require("../config/db.config.js");
const Respond = db.Respond;
const Shop = db.Shop;
const Request = db.Request;
const { io, userSockets } = require("../socketManager.js");
const shop = require("./shop.js");
const { getSellerShopLocation } = require("./shop.js");

// Now you can use getSellerShopLocation() directly

// get seller reponds
exports.GetSellerResponds = async (req, res) => {
  const SellerId = req.userId;

  try {
    const responds = await Respond.findAll({
      where: {
        seller_id: SellerId,
      },
    });

    res.status(200).json({
      responds: responds,
    });
  } catch (err) {
    console.error("Error fetching user requests:", err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

// get user responds
exports.getUserResponses = async (req, res) => {
  const userId = req.userId;

  try {
    const userResponses = await Respond.findAll({
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
    });

    const sellerIds = userResponses.map((response) => response.seller_id);

    const shopLocations = {};
    try {
      for (const sellerId of sellerIds) {
        const { shopLatitude, shopLongitude } = await getSellerShopLocation(
          sellerId
        );
        shopLocations[sellerId] = { shopLatitude, shopLongitude };
      }
    } catch (error) {
      console.error("Error fetching shop locations:", error.message);
      return res.status(400).json({ error: error.message });
    }

    const combinedData = userResponses.map((response) => ({
      ...response.dataValues,
      shopLatitude: shopLocations[response.seller_id].shopLatitude,
      shopLongitude: shopLocations[response.seller_id].shopLongitude,
    }));

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching user responses:", error.message);
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
    });

    // get Seller shop location
    const shop = await Shop.findOne({ where: { seller_id: SellerId } });
    if (!shop) {
      res.status(400).json({ error: "فروشگاهی به نام این فروشنده پیدا نشد" });
    }
    const shopLatitude = shop.latitude;
    const shopLongitude = shop.longitude;

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
    const response = await Respond.findByPk(response_id);

    if (!response) {
      return res.status(404).json({ msg: "پاسخ پیدا نشد" });
    }

    if (response.seller_id !== req.userId) {
      return res.status(403).send({ message: "عدم دسترسی مجاز" });
    }

    await response.update({
      price,
      seller_respond,
      timestamp: timestamp,
    });

    const request = await Request.findOne({
      where: { id: response.request_id },
    });

    // Emit an event to the specific user
    const userSocketId = userSockets[request.users_id];
    if (userSocketId) {
      io.to(userSocketId).emit("responseUpdated", {
        response_id,
        price,
        seller_respond,
        timestamp,
      });
    }

    res
      .status(200)
      .json({
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
    const response = await Respond.findByPk(response_id);

    if (!response) {
      return res.status(404).json({ msg: "پاسخ پیدا نشد" });
    }

    if (response.seller_id !== req.userId) {
      return res.status(403).send({ message: "عدم دسترسی مجاز" });
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
