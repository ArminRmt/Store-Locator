const db = require("../config/db.config.js");
const User = db.User;
const Request = db.Request;

// View all buyess
exports.getAllUsers = async (req, res) => {
  try {
    const buyers = await User.findAll({
      where: {
        role: "buyer",
      },
    });
    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// View all buyess
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Backend
exports.updateUserRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.role = role;
    await user.save();
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
