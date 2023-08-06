const db = require("../config/db.config.js");
const User = db.User;

async function isPhoneNumberUnique(phoneNumber) {
  try {
    const user = await User.findOne({ where: { phone: phoneNumber } });
    return !user;
  } catch (error) {
    console.error("خطا هنگام بررسی یکتا بودن شماره تلفن:", error);
    throw error;
  }
}

exports.validateName = (req, res, next) => {
  const name = req.body.full_name;

  if (
    !name ||
    !/^[a-zA-Z\s]+(?:[0-9])?$/.test(name) ||
    name.length < 3 ||
    name.length > 100
  ) {
    return res.status(400).json({
      msg: "نام باید تنها شامل حروف، فاصله‌ها و می‌تواند به اختیار با یک عدد ختم شود. طول آن باید بین ۳ تا ۱۰۰ کاراکتر باشد.",
    });
  }

  next();
};

exports.validatePassword = (req, res, next) => {
  const password = req.body.password;
  if (!password || password.length < 8 || password.length > 30) {
    return res
      .status(400)
      .json({ msg: "رمزعبور باید بین ۸ تا ۳۰ کاراکتر باشد." });
  }
  next();
};

exports.validatePasswordMatch = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ msg: "رمزعبور و تأیید رمزعبور با هم مطابقت ندارند." });
  }
  next();
};

exports.ValidateRole = (req, res, next) => {
  const { role } = req.body;
  if (role !== "admin" && role !== "buyer") {
    return res
      .status(400)
      .json({ msg: "نقش باید یا مدیر (admin) یا خریدار (buyer) باشد" });
  }
  next();
};

exports.validatePhoneNumber = async (req, res, next) => {
  const { phone } = req.body;

  if (!phone || !/^\d{11}$/.test(phone)) {
    return res
      .status(400)
      .json({ msg: "شماره تلفن باید یک عدد ۱۱ رقمی معتبر باشد." });
  }

  const isUnique = await isPhoneNumberUnique(phone);

  if (!isUnique) {
    return res.status(400).json({ msg: "شماره تلفن باید یکتا باشد." });
  }

  next();
};

exports.RequireFieldsSeller = (req, res, next) => {
  const { full_name, phone } = req.body;
  if (!full_name || !phone) {
    return res
      .status(400)
      .json({ msg: "نام و نام خانوادگی و شماره تلفن فیلدهای اجباری هستند." });
  }
  next();
};

exports.RequireFieldsUser = (req, res, next) => {
  const { full_name, phone, role } = req.body;
  if (!full_name || !phone || !role) {
    return res.status(400).json({
      msg: "نام و نام خانوادگی، شماره تلفن و نقش، فیلدهای اجباری هستند.",
    });
  }
  next();
};

exports.RequireFieldsShop = (req, res, next) => {
  const { seller_id, name, phone, address, open_time, latitude, longitude } =
    req.body;

  if (
    !seller_id ||
    !name ||
    !phone ||
    !address ||
    !open_time ||
    !latitude ||
    !longitude
  ) {
    return res.status(400).json({ msg: "تمامی فیلدها به جز bio الزامی هستند" });
  }
  next();
};

exports.RequireFieldsRequest = (req, res, next) => {
  const { piece_name } = req.body;

  if (!piece_name) {
    return res.status(400).json({ msg: "نام قطعه الزامی هستند" });
  }
  next();
};

exports.RequireFieldsRespond = (req, res, next) => {
  const { type } = req.body;

  if (!type) {
    return res.status(400).json({ msg: "نام قطعه الزامی هستند" });
  }
  next();
};
