const db = require("../config/db.config.js");
const Request = db.Request;
const RequestSellerLinks = db.RequestSellerLinks;
const { io, sellerSockets } = require("../socketManager.js");
const { NearestShops } = require("./shop.js");

// get seller requests
exports.SellerRequests = async (req, res) => {
  const sellerID = req.userId;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;

  const offset = (page - 1) * pageSize;

  try {
    // join requests and request_seller_links tables
    const requests = await Request.findAll({
      include: [
        {
          model: RequestSellerLinks,
          where: { seller_id: sellerID },
          attributes: [],
        },
      ],
      limit: pageSize,
      offset: offset,
      order: [["timestamp", "DESC"]],
    });

    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching seller requests:", err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.GetUserRequest = async (req, res) => {
  const userId = req.userId;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;

  const offset = (page - 1) * pageSize;

  try {
    const userRequests = await Request.findAll({
      attributes: ["id", "piece_name", "content", "timestamp"],
      where: {
        users_id: userId,
      },
      order: [["timestamp", "DESC"]],
      limit: pageSize,
      offset: offset,
    });

    res.status(200).json(userRequests);
  } catch (err) {
    console.error("Error fetching user requests:", err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.createRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const { piece_name, content, userLongitude, userLatitude } = req.body;
    const timestamp = new Date().toISOString();

    const newRequest = await Request.create({
      users_id: userId,
      piece_name: piece_name,
      content: content,
      timestamp: timestamp,
    });

    const nearest_shops = await NearestShops(userLongitude, userLatitude);

    // Use a Set to ensure unique seller_ids
    const uniqueSellerIds = new Set(
      nearest_shops.map((shop) => shop.seller_id)
    );
    const sellerIdsArray = Array.from(uniqueSellerIds);

    for (const seller_id of sellerIdsArray) {
      RequestSellerLinks.create({
        request_id: newRequest.id,
        seller_id: seller_id,
        status: 0,
      });

      // Emit an event to the specific seller
      // if (sellerSocketId && req.io.sockets.connected[sellerSocketId]) {
      const sellerSocketId = sellerSockets[seller_id];
      if (sellerSocketId) {
        io.to(sellerSocketId).emit("newRequest", newRequest);
      }
    }

    const result = {
      msg: "درخواست با موفقیت به نزدیک ترین فروشنده ها ارسال شد",
      piece_name,
      content,
      timestamp: timestamp,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("error is: ", error.message);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};

exports.UpdateRequest = async (req, res) => {
  const { request_id, piece_name, content } = req.body;
  const timestamp = new Date().toISOString();

  try {
    const [rowsAffected, [updatedRequest]] = await Request.update(
      {
        piece_name,
        content,
        timestamp: timestamp,
      },
      {
        returning: true,
        where: {
          id: request_id,
          users_id: req.userId,
        },
      }
    );

    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ msg: "درخواست پیدا نشد یا شما مجوز به‌روزرسانی ندارید" });
    }

    // Get all seller_ids associated with the request from request_seller_links
    const links = await RequestSellerLinks.findAll({
      where: { request_id: request_id },
    });

    for (const link of links) {
      const sellerSocketId = sellerSockets[link.seller_id];
      if (sellerSocketId) {
        io.to(sellerSocketId).emit("requestUpdated", {
          request_id,
          piece_name,
          content,
          timestamp,
        });
      }
    }

    res.status(200).json({
      msg: "درخواست به‌روزرسانی شد",
      request_id,
      piece_name,
      content,
      timestamp,
    });
  } catch (error) {
    res.status(500).json({ msg: "خطای سرور" });
  }
};

exports.DeleteRequest = async (req, res) => {
  const { request_id } = req.body;

  try {
    const request = await Request.findOne({
      where: {
        id: request_id,
      },
    });

    if (!request) {
      return res
        .status(404)
        .json({ message: "درخواست یافت نشد یا شما مجوز حذف آن را ندارید." });
    }

    // Get all seller_ids associated with the request from request_seller_links
    const links = await RequestSellerLinks.findAll({
      where: { request_id: request_id },
    });

    for (const link of links) {
      const sellerSocketId = sellerSockets[link.seller_id];
      if (sellerSocketId) {
        io.to(sellerSocketId).emit("requestDeleted", { request_id });
      }
    }

    await request.destroy();

    res.status(200).json({ msg: "درخواست حذف شد", request_id });
  } catch (error) {
    res.status(500).json({ msg: "خطای سرور" });
  }
};
