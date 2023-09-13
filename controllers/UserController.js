const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config.js");
const User = db.User;
// const env = require("../config/env.js");
const { json } = require("body-parser");

exports.GetUserByToken = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        error: "پیام: هیچ توکنی ارائه نشده است!",
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = await jwt.verify(token, process.env.AUTH_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        error: "توکن غیر معتبر است",
      });
    }

    const userId = decoded.id;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        error: "کاربری با این توکن یافت نشد",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("error is: ", error.msg);
    return res
      .status(500)
      .json({ error: "خطای سرور: لطفاً بعداً دوباره تلاش کنید" });
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
    console.error("error is: ", error.msg);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error("error is: ", error.msg);
    res.status(500).json({ error: "خطای سرور داخلی" });
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
        .json({ error: "کاربر پیدا نشد یا شما مجوز به‌روزرسانی ندارید" });
    }

    res.status(200).json({ msg: "کاربر به‌روزرسانی شد" });
  } catch (error) {
    console.error("error is: ", error.msg);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};
