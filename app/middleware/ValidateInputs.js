const db = require("../config/db.config.js");
const User = db.User;

async function isPhoneNumberUnique(phoneNumber) {
  try {
    const user = await User.findOne({ where: { phone: phoneNumber } });
    return !user;
  } catch (error) {
    console.error("Error while checking phone number uniqueness:", error);
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
      msg: "Name must contain only letters, spaces, and can optionally end with a number. It should be between 3 and 100 characters long.",
    });
  }

  next();
};

exports.validatePassword = (req, res, next) => {
  const password = req.body.password;
  if (!password || password.length < 8 || password.length > 30) {
    return res
      .status(400)
      .json({ msg: "Password must be between 8 and 30 characters long." });
  }
  next();
};

exports.validatePasswordMatch = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ msg: "Password and confirm password do not match." });
  }
  next();
};

exports.ValidateRole = (req, res, next) => {
  const { role } = req.body;
  if (role !== "admin" && role !== "buyer") {
    return res.status(400).json({ msg: "Role must be either admin or buyer" });
  }
  next();
};

exports.validatePhoneNumber = async (req, res, next) => {
  const { phone } = req.body;

  if (!phone || !/^\d{11}$/.test(phone)) {
    return res
      .status(400)
      .json({ msg: "Phone number must be a valid 11-digit number." });
  }

  const isUnique = await isPhoneNumberUnique(phone);

  if (!isUnique) {
    return res.status(400).json({ msg: "Phone number must be unique." });
  }

  next();
};
