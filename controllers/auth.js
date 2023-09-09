const db = require("../config/db.config.js");
const User = db.User;
const Seller = db.Seller;
const argon2 = require("argon2");
var jwt = require("jsonwebtoken");
const env = require("../config/env.js");

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
    console.error(error);
    res.status(500).json({ msg: "مشکلی در ثبت نام به وجود آمده است." });
  }
};

// sign in user
exports.signin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).send({ message: "کاربر پیدا نشد." });
    }

    const passwordIsValid = await argon2.verify(user.password, password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "رمز عبور نامعتبر است!",
      });
    }

    const token = jwt.sign({ id: user.id }, env.AUTH_SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "24h", // 86400 SECOND
    });

    res.status(200).json({ msg: "ورود موفقیت‌آمیز", token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "خطای سرور داخلی" });
  }
};

// crete seller
exports.seller_signup = async (req, res) => {
  const { full_name, phone, password } = req.body;

  try {
    const hashPassword = await argon2.hash(password);

    const newSeller = await Seller.create({
      full_name,
      phone,
      password: hashPassword,
    });

    res.status(201).json({ msg: "ثبت نام موفقیت‌آمیز", newSeller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "مشکلی در ثبت نام به وجود آمده است." });
  }
};

// sign in seller
exports.signinSeller = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const seller = await Seller.findOne({ phone });

    if (!seller) {
      return res.status(404).send({ message: "فروشنده پیدا نشد." });
    }

    const passwordIsValid = await argon2.verify(seller.password, password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "رمز عبور نامعتبر است!",
      });
    }

    const token = jwt.sign({ id: seller.id }, env.AUTH_SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "24h", // 86400 SECOND
    });

    res.status(200).json({ msg: "ورود موفقیت‌آمیز", token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "خطای سرور داخلی" });
  }
};
