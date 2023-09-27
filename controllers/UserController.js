const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const db = require("../config/db-config.js");
const User = db.User;
const { json } = require("body-parser");
const { logger } = require("../config/winston.js");

exports.GetUserByToken = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        error: "کاربری با این توکن یافت نشد",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "خطای سرور: لطفاً بعداً دوباره تلاش کنید" });
    logger.error("error in GetUserByToken: ", error);
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "کاربر یافت نشد" });
    }
  } catch (error) {
    res.status(500).json({ error: "خطای سرور داخلی" });
    logger.error("error in getUserById: ", error);
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "خطای سرور داخلی" });
    logger.error("error in getUsers: ", error);
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { full_name, phone, password } = req.body;
  const userId = req.userId;

  const updateFields = {};

  if (full_name) updateFields.full_name = full_name;
  if (phone) updateFields.phone = phone;
  if (password) {
    const hashPassword = await argon2.hash(password);
    updateFields.password = hashPassword;
  }

  try {
    const [rowsAffected, [updatedUser]] = await User.update(updateFields, {
      returning: true,
      where: {
        id: userId,
      },
    });

    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ error: "کاربر پیدا نشد یا شما مجوز به‌روزرسانی ندارید" });
    }

    res.status(200).json({ msg: "کاربر به‌روزرسانی شد" });
  } catch (error) {
    res.status(500).json({ error: "خطای سرور داخلی" });
    logger.error("error in updateUser: ", error);
  }
};
