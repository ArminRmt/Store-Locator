const jwt = require("jsonwebtoken");
const db = require("../config/db.config.js");
const User = db.User;
const env = require("../config/env.js");

verifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send({
      message: "پیام: هیچ توکنی ارائه نشده است!",
    });
  }

  let token = authHeader.replace("Bearer ", "");

  jwt.verify(token, env.AUTH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "عدم مجوز!",
      });
    }
    req.userId = decoded.id;

    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "کاربر پیدا نشد." });
    }

    if (user.role === "admin") {
      next();
    } else {
      res.status(403).send({ message: "نیاز به نقش مدیر دارد!" });
    }
  } catch (err) {
    res.status(500).send({ message: "خطای سرور" });
  }
};

isSeller = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "کاربر پیدا نشد." });
    }

    const userIdInRequest = req.params.id || req.body.id;

    if (!userIdInRequest || parseInt(userIdInRequest) !== req.userId) {
      return res
        .status(403)
        .send({ message: "تنها صاحب یا مدیر دسترسی به این عملیات دارند." });
    }

    if (!user.role) {
      next();
    } else {
      res.status(403).send({ message: "نیاز به نقش فروشنده دارد!" });
    }
  } catch (err) {
    res.status(500).send({ message: "خطای سرور" });
  }
};

isUserOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "کاربر پیدا نشد." });
    }

    const userIdInRequest = req.params.id || req.body.id;

    if (!userIdInRequest || parseInt(userIdInRequest) !== req.userId) {
      return res
        .status(403)
        .send({ message: "تنها صاحب یا مدیر دسترسی به این عملیات دارند." });
    }

    if (user.role === "admin" || user.role === "buyer") {
      next();
    } else {
      res.status(403).send({ message: "نیاز به نقش مدیر یا خریدار دارد!" });
    }
  } catch (err) {
    res.status(500).send({ message: "خطای سرور" });
  }
};

isSellerOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "کاربر پیدا نشد." });
    }

    const userIdInRequest = req.params.id || req.body.id;

    if (!userIdInRequest || parseInt(userIdInRequest) !== req.userId) {
      return res
        .status(403)
        .send({ message: "تنها صاحب یا مدیر دسترسی به این عملیات دارند." });
    }

    if (!user.role || user.role === "admin") {
      next();
    } else {
      res.status(403).send({ message: "نیاز به نقش مدیر یا فروشنده دارد!" });
    }
  } catch (err) {
    res.status(500).send({ message: "خطای سرور" });
  }
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUserOrAdmin: isUserOrAdmin,
  isSeller: isSeller,
  isSellerOrAdmin: isSellerOrAdmin,
};
module.exports = authJwt;
