const argon2 = require("argon2");
const db = require("../config/db.config.js");
const Seller = db.Seller;

// Get a seller by ID
exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findByPk(req.params.id);

    if (seller) {
      res.status(200).json(seller);
    } else {
      res.status(404).json({ message: "Seller not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all sellers
exports.getSellers = async (req, res) => {
  try {
    const response = await Seller.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update a seller by ID
exports.updateSeller = async (req, res) => {
  const { full_name, phone, password, confirmPassword } = req.body;

  try {
    const seller = await Seller.findByPk(req.params.id);

    if (!seller) {
      return res.status(404).json({ msg: "Seller Not Found" });
    }

    // Validate input data
    if (!full_name || !phone) {
      return res
        .status(400)
        .json({ msg: "full_name and phone are required fields." });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password do not match" });
    }

    let hashPassword = seller.password;
    if (password && password !== "") {
      hashPassword = await argon2.hash(password);
    }

    await seller.update({ full_name, phone, password: hashPassword });
    res.status(200).json({ msg: "Seller Updated" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete a seller by ID
exports.deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findByPk(req.params.id);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    await seller.destroy();

    res.status(200).json({ message: "Seller deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
