// const { Sequelize, QueryTypes } = require("sequelize");
// const { io } = require("../server.js");
const db = require("../config/db.config.js");
const Respond = db.Respond;

// get seller reponds
exports.GetSellerResponds = async (req, res) => {
  const userId = req.userId;
  try {
    const responds = await Respond.findAll({
      where: {
        seller_id: userId,
      },
    });

    res.status(200).json(responds);
  } catch (err) {
    console.error("Error fetching user requests:", err);
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
      type: seller_respond,
      timestamp: timestamp,
    });

    // Emit an event to the specific user
    req.io.to(buyerID).emit("newResponse", newResponse);

    res.status(200).json({
      msg: "پاسخ با موفقیت ارسال شد",
      price,
      seller_respond,
      timestamp,
    });
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

    res
      .status(200)
      .json({ msg: "پاسخ به‌روزرسانی شد", price, seller_respond, timestamp });
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

    await response.destroy();

    res.status(200).json({ msg: "پاسخ حذف شد" });
  } catch (error) {
    console.error("Error deleting response:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
