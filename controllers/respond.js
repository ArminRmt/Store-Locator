const db = require("../config/db.config.js");
const Respond = db.Respond;
const Shop = db.Shop;
const Request = db.Request;
const {
  io,
  userSockets,
  addToResponseQueue,
  addToUpdatedResponseQueue,
  addToDeletedResponseQueue,
} = require("../socketManager.js");

const { getSellerShopLocationAndName } = require("./shop.js");

// get seller reponds
exports.GetSellerResponds = async (req, res) => {
  const sellerId = req.userId;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  try {
    const { count, rows: responds } = await Respond.findAndCountAll({
      attributes: ["id", "request_id", "price", "seller_respond", "timestamp"],
      where: {
        seller_id: sellerId,
      },
      order: [["timestamp", "DESC"]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    if (count === 0) {
      return res.status(404).json({ message: "هیچ پاسخ فروشنده‌ای یافت نشد" });
    }

    const totalPages = Math.ceil(count / pageSize);

    return res.status(200).json({ responds, totalPages });
  } catch (err) {
    console.error("Error fetching seller responds:", err);
    return res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

// get user responds
// exports.getUserResponses = async (req, res) => {
//   const userId = req.userId;
//   const page = req.query.page || 1;
//   const pageSize = req.query.pageSize || 10;

//   const offset = (page - 1) * pageSize;

//   try {
//     const userResponses = await Respond.findAll({
//       where: {
//         is_deleted: false,
//       },
//       include: [
//         {
//           model: Request,
//           where: { users_id: userId },
//           attributes: ["piece_name"],
//         },
//       ],
//       attributes: [
//         "id",
//         "seller_id",
//         "request_id",
//         "price",
//         "seller_respond",
//         "timestamp",
//       ],
//       order: [["timestamp", "DESC"]],
//       limit: pageSize,
//       offset: offset,
//     });

//     const sellerIds = userResponses.map((response) => response.seller_id);

//     const shopLocations = {};
//     try {
//       for (const sellerId of sellerIds) {
//         const { shopLatitude, shopLongitude, shopName, shopID } =
//           await getSellerShopLocationAndName(sellerId);
//         shopLocations[sellerId] = {
//           shopLatitude,
//           shopLongitude,
//           shopName,
//           shopID,
//         };
//       }
//     } catch (error) {
//       console.error("Error fetching shop locations:", error.message);
//       return res.status(400).json({ error: error.message });
//     }

//     const combinedData = userResponses.map((response) => ({
//       ...response.dataValues,
//       shopLatitude: shopLocations[response.seller_id].shopLatitude,
//       shopLongitude: shopLocations[response.seller_id].shopLongitude,
//       shopName: shopLocations[response.seller_id].shopName,
//       shopID: shopLocations[response.seller_id].shopID,
//     }));

//     res.status(200).json(combinedData);
//   } catch (error) {
//     console.error("Error fetching user responses:", error.message);
//     res.status(500).json({ error: "خطای داخلی سرور" });
//   }
// };

// exports.responsesBasedonRequest = async (req, res) => {
//   const userId = req.userId;
//   const page = req.query.page || 1;
//   const pageSize = req.query.pageSize || 10;
//   const offset = (page - 1) * pageSize;

//   try {
//     const userResponses = await Respond.findAll({
//       where: {
//         is_deleted: false,
//       },
//       include: [
//         {
//           model: Request,
//           where: { users_id: userId },
//           attributes: ["piece_name"],
//         },
//       ],
//       attributes: [
//         "id",
//         "seller_id",
//         "request_id",
//         "price",
//         "seller_respond",
//         "timestamp",
//       ],
//       order: [["timestamp", "DESC"]],
//       limit: pageSize,
//       offset: offset,
//     });

//     const sellerIds = userResponses.map((response) => response.seller_id);

//     const shopLocations = {};
//     try {
//       for (const sellerId of sellerIds) {
//         const { shopLatitude, shopLongitude, shopName, shopID } =
//           await getSellerShopLocationAndName(sellerId);
//         shopLocations[sellerId] = {
//           shopLatitude,
//           shopLongitude,
//           shopName,
//           shopID,
//         };
//       }
//     } catch (error) {
//       console.error("Error fetching shop locations:", error.message);
//       return res.status(400).json({ error: error.message });
//     }

//     // Group userResponses by piece_name using reduce
//     const groupedData = userResponses.reduce((acc, response) => {
//       const pieceName = response.request ? response.request.piece_name : null;
//       if (pieceName) {
//         if (!acc[pieceName]) {
//           acc[pieceName] = [];
//         }
//         const responseData = {
//           ...response.dataValues,
//           shopLatitude: shopLocations[response.seller_id].shopLatitude,
//           shopLongitude: shopLocations[response.seller_id].shopLongitude,
//           shopName: shopLocations[response.seller_id].shopName,
//           shopID: shopLocations[response.seller_id].shopID,
//         };
//         acc[pieceName].push(responseData);
//       }
//       return acc;
//     }, {});

//     res.status(200).json(groupedData);
//   } catch (error) {
//     console.error("Error fetching user responses:", error.message);
//     res.status(500).json({ error: "خطای داخلی سرور" });
//   }
// };

// get user responds for specific request
exports.UserRequestResponses = async (req, res) => {
  const requestId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  try {
    const { count, rows: userResponses } = await Respond.findAndCountAll({
      where: {
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
      offset: (page - 1) * pageSize,
    });

    if (count === 0) {
      return res.status(404).json({ message: "هیچ پاسخ کاربری یافت نشد" });
    }
    const totalPages = Math.ceil(count / pageSize);

    const sellerIds = userResponses.map((response) => response.seller_id);

    const shopLocations = {};
    try {
      for (const sellerId of sellerIds) {
        const { shopLatitude, shopLongitude, shopName, shopID } =
          await getSellerShopLocationAndName(sellerId);
        shopLocations[sellerId] = {
          shopLatitude,
          shopLongitude,
          shopName,
          shopID,
        };
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
      shopID: shopLocations[response.seller_id].shopID,
    }));

    return res.status(200).json({ combinedData, totalPages });
  } catch (error) {
    console.error("Error fetching user responses:", error.message);
    return res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.createResponse = async (req, res) => {
  try {
    const { request_id, buyerID, price, seller_respond } = req.body;
    // const buyerID = req.body.user_id;
    const SellerId = req.userId;
    const timestamp = new Date().toISOString();

    const [newResponse, shopDetails] = await Promise.all([
      Respond.create({
        seller_id: SellerId,
        request_id: request_id,
        price: price,
        seller_respond: seller_respond,
        timestamp: timestamp,
        is_deleted: false,
      }),
      getSellerShopLocationAndName(SellerId),
    ]);

    const { shopLatitude, shopLongitude, shopName, shopID } = shopDetails;

    // Emit an event to the specific user
    const userSocketId = userSockets[buyerID];

    socketRes = {
      newResponseId: newResponse.id,
      seller_id: SellerId,
      request_id: request_id,
      price: price,
      seller_respond: seller_respond,
      timestamp: timestamp,
      shopLatitude: shopLatitude,
      shopLongitude: shopLongitude,
      shopName: shopName,
      shopID: shopID,
    };

    if (userSocketId) {
      io.to(userSocketId).emit("newResponse", socketRes);
    } else {
      // User is offline, add new response to the queue
      addToResponseQueue(buyerID, socketRes);
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
      shopID,
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
    // TODO update method could also be parller wiht two other querry below?
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

    const updatedRequestId = updatedResponse.request_id;
    const sellerId = updatedResponse.seller_id;

    // Parallelize the queries for request and shop
    const [request, shop] = await Promise.all([
      Request.findOne({
        where: { id: updatedRequestId },
      }),
      Shop.findOne({
        attributes: ["name", "id"],
        where: { seller_id: sellerId },
      }),
    ]);

    if (!shop) {
      return res.status(404).json({ msg: "فروشنده مرتبط یافت نشد" });
    }
    const shopName = shop.name;
    const shopID = shop.id;

    socketRes = {
      response_id,
      price,
      seller_respond,
      timestamp,
      shopName,
      shopID,
    };

    // Emit an event to the specific user
    const userSocketId = userSockets[request.users_id];
    if (userSocketId) {
      io.to(userSocketId).emit("responseUpdated", socketRes);
    } else {
      addToUpdatedResponseQueue(buyerID, socketRes);
    }

    res.status(200).json({
      msg: "پاسخ به‌روزرسانی شد",
      response_id,
      price,
      seller_respond,
      timestamp,
      shopID,
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
      io.to(userSocketId).emit("responseDeleted", response_id);
    } else {
      addToDeletedResponseQueue(request.users_id, response_id);
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
  const { response_id } = req.body;

  try {
    await Respond.update({ is_deleted: true }, { where: { id: response_id } });

    res.status(200).json(response_id);
    // res.sendStatus(204); // Send a 'No Content' status code
  } catch (error) {
    console.error("Error deleting response:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
