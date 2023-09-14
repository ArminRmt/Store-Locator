const jwt = require("jsonwebtoken");
const db = require("../config/db.config.js");
const User = db.User;
const Seller = db.Seller;
const { logger } = require("../config/winston.js");

const verifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const errorMessage = "پیام: هیچ توکنی ارائه نشده است!";
    return res.status(403).send({
      error: errorMessage,
    });
  }

  let token = authHeader.replace("Bearer ", "");

  jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          error: "توکن منقضی شده است.",
        });
      } else {
        return res.status(401).send({
          error: "عدم مجوز!",
        });
      }
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ error: "کاربر پیدا نشد." });
    }

    if (user.role === "admin") {
      next();
    } else {
      res.status(403).send({ error: "نیاز به نقش مدیر دارد!" });
    }
  } catch (err) {
    const errorMessage = "خطای سرور";
    logger.error(errorMessage, err);
    res.status(500).send({ error: errorMessage });
  }
};

const isBuyer = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ error: "کاربر پیدا نشد." });
    }

    if (user.role === "buyer") {
      next();
    } else {
      res.status(403).send({ error: "نیاز به نقش خریدار دارد!" });
    }
  } catch (err) {
    const errorMessage = "خطای سرور";
    logger.error(errorMessage, err);
    res.status(500).send({ error: errorMessage });
  }
};

const isSeller = async (req, res, next) => {
  try {
    const user = await Seller.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ error: "فروشنده پیدا نشد." });
    }

    // const userIdInRequest = req.params.id || req.body.id;

    // if (!userIdInRequest || parseInt(userIdInRequest) !== req.userId) {
    //   return res
    //     .status(403)
    //     .send({ error: "تنها صاحب یا مدیر دسترسی به این عملیات دارند." });
    // }

    if (!user.role) {
      next();
    } else {
      res.status(403).send({ error: "نیاز به نقش فروشنده دارد!" });
    }
  } catch (err) {
    const errorMessage = "خطای سرور";
    logger.error(errorMessage, err);
    res.status(500).send({ error: errorMessage });
  }
};

isUserOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ error: "کاربر پیدا نشد." });
    }

    // const userIdInRequest = req.params.id || req.body.id;

    // if (!userIdInRequest || parseInt(userIdInRequest) !== req.userId) {
    //   return res
    //     .status(403)
    //     .send({ error: "تنها صاحب یا مدیر دسترسی به این عملیات دارند." });
    // }

    if (user.role === "admin" || user.role === "buyer") {
      next();
    } else {
      res.status(403).send({ error: "نیاز به نقش مدیر یا خریدار دارد!" });
    }
  } catch (err) {
    const errorMessage = "خطای سرور";
    logger.error(errorMessage, err);
    res.status(500).send({ error: errorMessage });
  }
};

isSellerOrAdmin = async (req, res, next) => {
  try {
    // Check if the user is a seller
    let user = await Seller.findByPk(req.userId);

    // If the user is not a seller, check if they are an admin
    if (!user) {
      user = await User.findByPk(req.userId);
      if (!user) {
        return res
          .status(404)
          .send({ error: "شما ادمین یا فروشنده نمی باشید" });
      }
    }

    // const userIdInRequest = req.params.id || req.body.id;

    // if (!userIdInRequest || parseInt(userIdInRequest) !== req.userId) {
    //   return res
    //     .status(403)
    //     .send({ error: "تنها صاحب یا مدیر دسترسی به این عملیات دارند." });
    // }

    if (!user.role || user.role === "admin") {
      next();
    } else {
      res.status(403).send({ error: "نیاز به نقش مدیر یا فروشنده دارد!" });
    }
  } catch (err) {
    const errorMessage = "خطای سرور";
    logger.error(errorMessage, err);
    res.status(500).send({ error: errorMessage });
  }
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isBuyer: isBuyer,
  isUserOrAdmin: isUserOrAdmin,
  isSeller: isSeller,
  isSellerOrAdmin: isSellerOrAdmin,
};
module.exports = authJwt;
