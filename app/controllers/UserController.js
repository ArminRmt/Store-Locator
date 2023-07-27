const argon2 = require("argon2");
const db = require("../config/db.config.js");
const User = db.User;

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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

// function validatePasswordLength(password) {
//   return password.length >= 8 && password.length <= 30;
// }
// if (!validatePasswordLength(password)) {
//   return res.status(400).json({ msg: 'Password must be between 8 and 30 characters long.' });
// }

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { full_name, phone, password, confirmPassword, role } = req.body;

  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    // Validate input data
    if (!full_name || !phone || !role) {
      return res
        .status(400)
        .json({ msg: "full_name, phone, and role are required fields." });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password do not match" });
    }

    let hashPassword = user.password;
    if (password && password !== "") {
      hashPassword = await argon2.hash(password);
    }

    await user.update({ full_name, phone, password: hashPassword, role });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
