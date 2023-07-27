const db = require("../config/db.config.js");
const Shop = db.Shop;

// Get a shop by ID
exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findByPk(req.params.id);

    if (shop) {
      res.status(200).json(shop);
    } else {
      res.status(404).json({ message: "Shop not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all shops
exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.findAll();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createShop = async (req, res) => {
  const {
    seller_id,
    name,
    phone,
    bio,
    address,
    open_time,
    latitude,
    longitude,
  } = req.body;

  try {
    if (
      !seller_id ||
      !name ||
      !phone ||
      !address ||
      !open_time ||
      !latitude ||
      !longitude
    ) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields." });
    }

    const newShop = await Shop.create({
      seller_id,
      name,
      phone,
      bio,
      address,
      open_time,
      avg_rating: 0,
      latitude,
      longitude,
    });

    res.status(201).json(newShop);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update a shop by ID
exports.updateShop = async (req, res) => {
  const {
    name,
    phone,
    bio,
    address,
    open_time,
    avg_rating,
    latitude,
    longitude,
  } = req.body;

  try {
    const shop = await Shop.findByPk(req.params.id);

    if (!shop) {
      return res.status(404).json({ msg: "Shop Not Found" });
    }

    // Validate input data (you may add more validation if needed)
    if (
      !name ||
      !phone ||
      !address ||
      !open_time ||
      !avg_rating ||
      !latitude ||
      !longitude
    ) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields." });
    }

    await shop.update({
      name,
      phone,
      bio,
      address,
      open_time,
      avg_rating,
      latitude,
      longitude,
    });

    res.status(200).json({ msg: "Shop Updated" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete a shop by ID
exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByPk(req.params.id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    await shop.destroy();

    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
