const db = require("../config/db.config.js");
const Request = db.Request;
const RequestSellerLinks = db.RequestSellerLinks;
const Respond = db.Respond;
const shop = require("./shop.js");
const { io, sellerSockets } = require("../socketManager.js");

// get seller requests
exports.SellerRequests = async (req, res) => {
  const sellerID = req.userId;
  try {
    // join requests and request_seller_links tables
    const requests = await Request.findAll({
      include: [
        {
          model: RequestSellerLinks,
          where: { seller_id: sellerID },
          attributes: [], // Exclude attributes from RequestSellerLinks
        },
      ],
    });

    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching seller requests:", err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.GetUserRequest = async (req, res) => {
  const userId = req.userId;
  try {
    const userRequests = await Request.findAll({
      where: {
        users_id: userId,
      },
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
    const { piece_name, content } = req.body;
    const timestamp = new Date().toISOString();

    const newRequest = await Request.create({
      users_id: userId,
      piece_name: piece_name,
      content: content,
      timestamp: timestamp,
    });

    const nearest_shops = await shop.NearestShops();

    // Use a Set to ensure unique seller_ids
    const uniqueSellerIds = new Set(
      nearest_shops.map((shop) => shop.seller_id)
    );
    const sellerIdsArray = Array.from(uniqueSellerIds);

    for (const seller_id of sellerIdsArray) {
      RequestSellerLinks.create({
        request_id: newRequest.id,
        seller_id: seller_id,
      });

      // Emit an event to the specific seller
      const sellerSocketId = sellerSockets[seller_id]; // Use the stored socket ID
      if (sellerSocketId) {
        io.to(sellerSocketId).emit("newRequest", newRequest);
      }
      // const sellerSocketId = req.sellerSockets[SellerId];
      // if (sellerSocketId && req.io.sockets.connected[sellerSocketId]) {
      //   req.io.to(sellerSocketId).emit("newRequest", newRequest);
      // }
    }

    const result = {
      msg: "درخواست با موفقیت به نزدیک ترین فروشنده ها ارسال شد",
      ...newRequest.get(),
    };
    delete result.users_id;

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
    const request = await Request.findByPk(request_id);

    if (!request) {
      return res.status(404).json({ msg: "درخواست پیدا نشد" });
    }

    if (request.users_id !== req.userId) {
      return res.status(403).send({ message: "عدم دسترسی مجاز" });
    }

    await request.update({
      piece_name,
      content,
      timestamp: timestamp,
    });

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

    res
      .status(200)
      .json({ msg: "درخواست به‌روزرسانی شد", piece_name, content, timestamp });
  } catch (error) {
    res.status(500).json({ msg: "خطای سرور" });
  }
};

exports.DeleteRequest = async (req, res) => {
  const { request_id } = req.body;

  try {
    const request = await Request.findByPk(request_id);

    if (!request) {
      return res.status(404).json({ msg: "درخواست پیدا نشد" });
    }

    if (request.users_id !== req.userId) {
      return res.status(403).send({ message: "عدم دسترسی مجاز" });
    }

    // Get all seller_ids associated with the request from request_seller_links
    const links = await RequestSellerLinks.findAll({
      where: { request_id: request_id },
    });

    for (const link of links) {
      const sellerSocketId = sellerSockets[link.seller_id]; // Replace with your logic to get the seller's socket ID
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
