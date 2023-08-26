const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config.js");
const User = db.User;
const env = require("../config/env.js");
const { json } = require("body-parser");

exports.GetUserByToken = async (req, res) => {
  let authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send({
      message: "پیام: هیچ توکنی ارائه نشده است!",
    });
  }

  let token = authHeader.replace("Bearer ", "");

  try {
    const decoded = await jwt.verify(token, env.AUTH_SECRET);
    const userId = decoded.id;

    const user = await User.findOne({ where: { id: userId } });

    res.status(200).json(user);
  } catch (err) {
    return res.status(401).json({ message: "توکن غیر معتبر است" });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "کاربر یافت نشد" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای سرور" });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { full_name, phone, password, role } = req.body;

  try {
    const hashPassword = await argon2.hash(password);

    const [rowsAffected, [updatedUser]] = await User.update(
      {
        full_name,
        phone,
        password: hashPassword,
        role,
      },
      {
        returning: false,
        where: {
          id: request_id,
          users_id: req.userId,
        },
      }
    );

    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ msg: "کاربر پیدا نشد یا شما مجوز به‌روزرسانی ندارید" });
    }

    res.status(200).json({ msg: "کاربر به‌روزرسانی شد" });
  } catch (error) {
    res.status(500).json({ msg: "خطای سرور" });
  }
};
