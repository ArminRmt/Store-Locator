const db = require("../config/db.config.js");
const config = require("../config/auth.config.js");
const User = db.User;
const Seller = db.Seller;

const argon2 = require("argon2");
var jwt = require("jsonwebtoken");

// crete user or admin
exports.signup = async (req, res) => {
  const { full_name, phone, password, confirmPassword, role } = req.body;

  try {
    const hashPassword = await argon2.hash(password);

    const newUser = await User.create({
      full_name,
      phone,
      password: hashPassword,
      role,
    });

    res.status(201).json({ msg: "Successful Registration", newUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// crete seller
exports.seller_signup = async (req, res) => {
  const { full_name, phone, password, confirmPassword } = req.body;

  // Validate the password length before hashing
  if (password.length < 8 || password.length > 30) {
    return res
      .status(400)
      .json({ msg: "Password must be between 8 and 30 characters long." });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ msg: "Password and confirm password do not match." });
  }

  try {
    const hashPassword = await argon2.hash(password);

    const newSeller = await Seller.create({
      full_name,
      phone,
      password: hashPassword, // Use the hashed password here, not the 'hashPassword' variable.
    });

    res.status(201).json({ msg: "Successful Registration", newSeller });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// sign in
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        phone: req.body.phone,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = await argon2.verify(
      user.password,
      req.body.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "24h", // 86400 SECOND
    });

    res.status(200).send({
      id: user.id,
      full_name: user.full_name,
      phone: user.phone,
      accessToken: token,
    });
  } catch (err) {
    console.error("Error during signin:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
