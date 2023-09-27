const db = require("../config/db-config.js");
const User = db.User;
const Seller = db.Seller;
const argon2 = require("argon2");
var jwt = require("jsonwebtoken");
const { logger } = require("../config/winston.js");

// crete user or admin
exports.signup = async (req, res) => {
  const { full_name, phone, password, role } = req.body;

  try {
    const hashPassword = await argon2.hash(password);

    const newUser = await User.create({
      full_name,
      phone,
      password: hashPassword,
      role,
    });

    res.status(201).json({ msg: "ثبت نام موفقیت‌آمیز", newUser });
  } catch (error) {
    res.status(500).json({ msg: "مشکلی در ثبت نام به وجود آمده است." });
    logger.error("Error in user signup:", error);
  }
};

// sign in user
exports.signin = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        phone: phone,
      },
    });

    if (!user) {
      return res.status(404).send({ error: "کاربر پیدا نشد." });
    }

    const passwordIsValid = await argon2.verify(user.password, password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        error: "رمز عبور نامعتبر است!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "24h", // 86400 SECOND
    });

    res.status(200).json({ msg: "ورود موفقیت‌آمیز", token });
  } catch (error) {
    res.status(500).json({ error: "خطای داخلی سرور" });
    logger.error("Error in user signin:", error);
  }
};

// create seller
exports.seller_signup = async (req, res) => {
  const { full_name, phone, password } = req.body;

  try {
    const hashPassword = await argon2.hash(password);

    await Seller.create({
      full_name,
      phone,
      password: hashPassword,
    });

    res.status(201).json({ msg: "ثبت نام موفقیت‌آمیز" });
  } catch (error) {
    res.status(500).json({ error: "مشکلی در ثبت نام به وجود آمده است." });
    logger.error("Error in seller_signup:", error);
  }
};

// sign in seller
exports.signinSeller = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const seller = await Seller.findOne({
      where: {
        phone: phone,
      },
    });

    if (!seller) {
      return res.status(404).send({ error: "فروشنده پیدا نشد." });
    }

    const passwordIsValid = await argon2.verify(seller.password, password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        error: "رمز عبور نامعتبر است!",
      });
    }

    const token = jwt.sign({ id: seller.id }, process.env.AUTH_SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "24h", // 86400 SECOND
    });

    res.status(200).json({ msg: "ورود موفقیت‌آمیز", token });
  } catch (error) {
    res.status(500).send({ error: "خطای سرور داخلی" });
    logger.error("Error in seller signin:", error);
  }
};
