const db = require("../config/db.config.js");
const Shop = db.Shop;
const axios = require("axios");
const geolib = require("geolib");
const env = require("../config/env.js");

exports.NearestShops = async () => {
  // async function NearestShops() {
  const address = "مازندران نوشهر هفت تیر هفت تیر ۱۰";
  API_KEY = env.NESHAN_KEY;
  try {
    const response = await axios.get("https://api.neshan.org/v4/geocoding", {
      params: {
        address,
      },
      headers: {
        "Api-Key": API_KEY,
      },
    });

    userLongitude = parseFloat(response.data.location.x);
    userLatitude = parseFloat(response.data.location.y);

    const shops = await Shop.findAll();

    const distances = shops.map((shop) => {
      return {
        ...shop,
        distance: geolib.getDistance(
          { latitude: userLatitude, longitude: userLongitude },
          { latitude: shop.latitude, longitude: shop.longitude }
        ),
      };
    });

    distances.sort((a, b) => a.distance - b.distance);
    const dataValuesOnly = distances.map((item) => item.dataValues);

    return dataValuesOnly;
  } catch (error) {
    throw error;
  }
};

// Get a shop by ID
exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findByPk(req.params.id);

    if (shop) {
      res.status(200).json(shop);
    } else {
      res.status(404).json({ message: "فروشگاه پیدا نشد" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای سرور" });
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
    res.status(500).json({ msg: "خطای سرور" });
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
      return res.status(404).json({ msg: "فروشگاه پیدا نشد" });
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

    res.status(200).json({ msg: "فروشگاه به‌روزرسانی شد" });
  } catch (error) {
    res.status(500).json({ msg: "خطای سرور" });
  }
};

// Delete a shop by ID
exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByPk(req.params.id);

    if (!shop) {
      return res.status(404).json({ message: "فروشگاه پیدا نشد" });
    }

    await shop.destroy();

    res.status(200).json({ message: "فروشگاه با موفقیت حذف شد" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای سرور" });
  }
};
