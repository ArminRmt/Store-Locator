const db = require("../config/db-config.js");
const Request = db.Request;
const RequestSellerLinks = db.RequestSellerLinks;
const {
  io,
  sellerSockets,
  RequestQueue,
  UpdatedRequestQueue,
  DeletedRequestQueue,
  addToQueue,
} = require("../socketManager.js");

const { logger } = require("../config/winston.js");

const { NearestShops } = require("./shop.js");
const Sequelize = db.Sequelize;
const { Op } = Sequelize;

exports.autoComplete = async (req, res) => {
  const partialQuery = req.query.q;

  try {
    const suggestions = await Request.findAll({
      attributes: ["piece_name"],
      where: {
        piece_name: {
          [Op.iLike]: `%${partialQuery}%`,
        },
        users_id: req.userId,
      },
      limit: 10,
    });

    const suggestionList = suggestions.map((request) => request.piece_name);
    return res.status(200).json(suggestionList);
  } catch (error) {
    console.error("Error fetching auto-completion suggestions:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.searchRequests = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 6;
  const keyword = req.query.q;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const desiredTimestamp = req.query.time;

  if (!keyword || keyword.trim() === "") {
    return res.status(400).json({ error: "کلمه کلیدی جستجو نامعتبر است" });
  }

  try {
    const offset = (page - 1) * pageSize;

    const whereClause = {
      [Op.or]: [
        { piece_name: { [Op.iLike]: `%${keyword}%` } },
        { content: { [Op.iLike]: `%${keyword}%` } },
      ],
      users_id: req.userId,
    };

    if (startDate && endDate) {
      whereClause.timestamp = {
        [Op.between]: [startDate, endDate],
      };
    } else if (desiredTimestamp) {
      whereClause.timestamp = new Date(desiredTimestamp).toISOString();
    }

    const matchingRecords = await Request.findAll({
      where: whereClause,
      order: [["timestamp", "DESC"]],
      limit: pageSize,
      offset: offset,
    });

    return res.status(200).json(matchingRecords);
  } catch (error) {
    console.error("Error searching requests:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

// get seller requests
exports.SellerRequests = async (req, res) => {
  const sellerID = req.userId;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  try {
    const { count, rows: requests } = await Request.findAndCountAll({
      include: [
        {
          model: RequestSellerLinks,
          where: { seller_id: sellerID },
          attributes: [],
        },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [["timestamp", "DESC"]],
    });

    const totalPages = Math.ceil(count / pageSize);
    const responseObj = { requests };
    if (totalPages > 0) {
      responseObj.totalPages = totalPages;
    }

    return res.status(200).json(responseObj);
  } catch (error) {
    logger.error(`Error fetching seller requests: ${error}`);
    return res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.GetUserRequest = async (req, res) => {
  const userId = req.userId;
  let page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  page = Math.max(1, page); // Ensure page is at least 1

  try {
    const { count, rows: userRequests } = await Request.findAndCountAll({
      attributes: ["id", "piece_name", "content", "timestamp"],
      where: {
        users_id: userId,
      },
      order: [["timestamp", "DESC"]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    if (count === 0) {
      return res.status(404).json({ error: "هیچ درخواست کاربری یافت نشد" });
    }
    const totalPages = Math.ceil(count / pageSize);

    return res.status(200).json({
      userRequests,
      totalPages,
    });
  } catch (error) {
    logger.error(`Error fetching user requests: ${error}`);
    return res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.GetRequest = async (req, res) => {
  const requestId = req.params.id;
  try {
    const userRequest = await Request.findByPk(requestId);

    if (!userRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    return res.status(200).json(userRequest);
  } catch (error) {
    logger.error("Error fetching user requests:", error);
    return res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.createRequest = async (req, res) => {
  const userId = req.userId;
  const { piece_name, content, userLongitude, userLatitude } = req.body;
  try {
    const timestamp = new Date().toISOString();

    const newRequest = await Request.create({
      userId: 1,
      users_id: userId,
      piece_name: piece_name,
      content: content,
      timestamp: timestamp,
    });
    const request_id = newRequest.id;

    const nearest_shops = await NearestShops(userLongitude, userLatitude);
    // Use a Set to ensure unique seller_ids
    const uniqueSellerIds = new Set(
      nearest_shops.map((shop) => shop.seller_id)
    );
    const sellerIdsArray = Array.from(uniqueSellerIds);

    // batch insert (inserting multiple rows of data into a database in a single query)
    const requestSellerLinksBatch = sellerIdsArray.map((seller_id) => ({
      request_id: request_id,
      seller_id: seller_id,
      status: 0,
    }));
    await RequestSellerLinks.bulkCreate(requestSellerLinksBatch);

    // Emit events and add to the queue concurrently
    const sellerOperations = sellerIdsArray.map(async (seller_id) => {
      const sellerSocketId = sellerSockets[seller_id];
      if (sellerSocketId) {
        io.to(sellerSocketId).emit("newRequest", newRequest);
      } else {
        addToQueue(RequestQueue, seller_id, newRequest);
      }
    });

    await Promise.all(sellerOperations);

    const result = {
      msg: "درخواست با موفقیت به نزدیک ترین فروشنده ها ارسال شد",
      request_id,
      piece_name,
      content,
      timestamp: timestamp,
      nearest_shops,
    };

    res.status(200).json(result);
  } catch (error) {
    logger.error("error in createRequest: ", error);
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
        .json({ error: "درخواست پیدا نشد یا شما مجوز به‌روزرسانی ندارید" });
    }

    // Get all seller_ids associated with the request from request_seller_links
    const links = await RequestSellerLinks.findAll({
      where: { request_id: request_id },
    });

    updatedRequest = { request_id, piece_name, content, timestamp };

    const sellerOperations = links.map(async (link) => {
      const sellerSocketId = sellerSockets[link.seller_id];
      if (sellerSocketId) {
        io.to(sellerSocketId).emit("requestUpdated", updatedRequest);
      } else {
        addToQueue(UpdatedRequestQueue, link.seller_id, updatedRequest);
      }
    });

    await Promise.all(sellerOperations);

    res.status(200).json({
      msg: "درخواست به‌روزرسانی شد",
      request_id,
      piece_name,
      content,
      timestamp,
    });
  } catch (error) {
    logger.error("error in UpdateRequest ", error.message);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};

exports.DeleteRequest = async (req, res) => {
  const { request_id } = req.body;

  try {
    // Check if the user has permission to delete the request
    const request = await Request.findOne({
      where: {
        id: request_id,
        users_id: req.userId,
      },
    });

    if (!request) {
      return res
        .status(404)
        .json({ error: "درخواست یافت نشد یا شما مجوز حذف آن را ندارید." });
    }

    // Get all seller_ids associated with the request from request_seller_links
    const links = await RequestSellerLinks.findAll({
      where: { request_id: request_id },
    });

    const deleteOperations = links.map(async (link) => {
      const sellerSocketId = sellerSockets[link.seller_id];
      if (sellerSocketId) {
        io.to(sellerSocketId).emit("requestDeleted", request_id);
      } else {
        addToQueue(DeletedRequestQueue, link.seller_id, request_id);
      }
    });
    await Promise.all(deleteOperations);

    await request.destroy();

    res.status(200).json({ msg: "درخواست حذف شد", request_id });
  } catch (error) {
    logger.error("error in DeleteRequest: ", error.message);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};
