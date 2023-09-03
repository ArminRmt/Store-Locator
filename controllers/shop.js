const db = require("../config/db.config.js");
const Shop = db.Shop;
const axios = require("axios");
const geolib = require("geolib");
const env = require("../config/env.js");

exports.getSellerShopLocationAndName = async (sellerId) => {
  try {
    const shop = await Shop.findOne({
      where: { seller_id: sellerId },
      attributes: ["latitude", "longitude", "name", "id"],
    });

    if (!shop) {
      throw new Error("فروشگاهی به نام این فروشنده پیدا نشد");
    }

    const shopLatitude = shop.latitude;
    const shopLongitude = shop.longitude;
    const shopName = shop.name;
    const shopID = shop.id;

    return { shopLatitude, shopLongitude, shopName, shopID };
  } catch (error) {
    throw error;
  }
};

exports.NearestShops = async (userLongitude, userLatitude) => {
  // const address = "مازندران نوشهر هفت تیر هفت تیر ۱۰";
  // API_KEY = env.NESHAN_KEY;
  try {
    //   const response = await axios.get("https://api.neshan.org/v4/geocoding", {
    //     params: {
    //       address,
    //     },
    //     headers: {
    //       "Api-Key": API_KEY,
    //     },
    //   });

    // userLongitude = parseFloat(response.data.location.x);
    // userLatitude = parseFloat(response.data.location.y);

    userLongitude = 51.48726536307878;
    userLatitude = 36.64185635489182;

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

// Get all shops
exports.getShops = async (req, res) => {
  try {
    const sellerID = req.userId;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;

    const offset = (page - 1) * pageSize;

    const shops = await Shop.findAll({
      where: {
        seller_id: sellerID,
      },
      limit: pageSize,
      offset: offset,
    });

    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// seller shop details
exports.getSellerShop = async (req, res) => {
  try {
    const sellerID = req.params.id;

    const shops = await Shop.findOne({
      where: {
        seller_id: sellerID,
      },
    });

    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ msg: "خطای سرور" });
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
      avg_rating: null,
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
    seller_id,
    name,
    phone,
    bio,
    address,
    open_time,
    avg_rating,
    latitude,
    longitude,
  } = req.body;

  const sellerID = req.userId;

  try {
    const [rowsAffected, [updatedshop]] = await Shop.update(
      {
        name,
        phone,
        bio,
        address,
        open_time,
        avg_rating,
        latitude,
        longitude,
      },
      {
        returning: false,
        where: {
          id: seller_id,
          users_id: sellerID,
        },
      }
    );

    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ msg: "فروشگاه پیدا نشد یا شما مجوز به‌روزرسانی ندارید" });
    }

    res.status(200).json({ msg: "فروشگاه به‌روزرسانی شد" });
  } catch (error) {
    res.status(500).json({ msg: "خطای سرور" });
  }
};

// Delete a shop by ID
exports.deleteShop = async (req, res) => {
  try {
    const { seller_id } = req.body;
    const sellerID = req.userId;

    const shop = await Shop.findOne({
      where: {
        id: seller_id,
        users_id: sellerID,
      },
    });

    if (!request) {
      return res
        .status(404)
        .json({ message: "فروشگاه یافت نشد یا شما مجوز حذف آن را ندارید." });
    }

    await shop.destroy();

    res.status(200).json({ message: "فروشگاه با موفقیت حذف شد" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای سرور" });
  }
};
