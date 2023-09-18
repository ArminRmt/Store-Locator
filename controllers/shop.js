const db = require("../config/db.config.js");
const Shop = db.Shop;
const geolib = require("geolib");
const { logger } = require("../config/winston.js");

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
    logger.error("error in getSellerShopLocationAndName: ", error);
    throw error;
  }
};

exports.NearestShops = async (userLongitude, userLatitude) => {
  try {
    userLatitude = 36.5393;
    userLongitude = 52.6893;
    const MAX_DISTANCE = 5;

    const shops = await Shop.findAll({
      attributes: ["id", "seller_id", "latitude", "longitude"],
    });

    const distances = shops
      .map((shop) => {
        const distance = geolib.getDistance(
          { latitude: userLatitude, longitude: userLongitude },
          { latitude: shop.latitude, longitude: shop.longitude }
        );

        if (distance <= MAX_DISTANCE * 1000) {
          return {
            ...shop,
            distance: distance,
          };
        } else {
          return null; // Exclude shops beyond 10 kilometers
        }
      })
      .filter((shop) => shop !== null); // Remove null entries (shops beyond 10 kilometers)

    distances.sort((a, b) => a.distance - b.distance);
    const dataValuesOnly = distances.map((item) => item.dataValues);

    return dataValuesOnly;
  } catch (error) {
    logger.error("error in NearestShops: ", error);
    throw error;
  }
};

// TODO direct database calculations using the database's geospatial functions (e.g., PostGIS for PostgreSQL) tend to be faster
// Install and Set Up a Geospatial Extension
// exports.NearestShops = async (userLongitude, userLatitude) => {
//   try {
//     userLatitude = 36.5393;
//     userLongitude = 52.6893;
//     const MAX_DISTANCE = 5;

//     // Use sequelize and Op from your db.config.js
//     const { sequelize, Sequelize } = db;
//     const { Op } = Sequelize;

//     // Query the database for nearby shops
//     const nearbyShops = await sequelize.query(
//       `
//       SELECT id, seller_id, latitude, longitude,
//         ST_Distance_Sphere(
//           POINT(:userLongitude, :userLatitude),
//           POINT(longitude, latitude)
//         ) AS distance
//       FROM shops
//       WHERE ST_Distance_Sphere(
//         POINT(:userLongitude, :userLatitude),
//         POINT(longitude, latitude)
//       ) <= :maxDistance
//       ORDER BY distance;
//     `,
//       {
//         replacements: {
//           userLongitude,
//           userLatitude,
//           maxDistance: MAX_DISTANCE * 1000, // Convert to meters
//         },
//         type: Sequelize.QueryTypes.SELECT,
//       }
//     );

//     return nearbyShops;
//   } catch (error) {
//     throw error;
//   }
// };

// Get all shops
exports.getShops = async (req, res) => {
  const sellerID = req.userId;
  const page = req.query.page || 1;
  const pageSize = 10;
  try {
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
    logger.error("error in getShops: ", error);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};

// seller shop details
exports.getSellerShop = async (req, res) => {
  const sellerID = req.params.id;
  try {
    const shops = await Shop.findOne({
      where: {
        seller_id: sellerID,
      },
    });

    res.status(200).json(shops);
  } catch (error) {
    logger.error("error in getSellerShop: ", error);
    res.status(500).json({ error: "خطای سرور داخلی" });
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
    logger.error("error in createShop: ", error);
    res.status(500).json({ error: "خطای سرور داخلی" });
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
        .json({ error: "فروشگاه پیدا نشد یا شما مجوز به‌روزرسانی ندارید" });
    }

    res.status(200).json({ msg: "فروشگاه به‌روزرسانی شد" });
  } catch (error) {
    logger.error("error in updateShop: ", error);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};

// Delete a shop by ID
exports.deleteShop = async (req, res) => {
  const { seller_id } = req.body;
  const sellerID = req.userId;
  try {
    const shop = await Shop.findOne({
      where: {
        id: seller_id,
        users_id: sellerID,
      },
    });

    if (!request) {
      return res
        .status(404)
        .json({ error: "فروشگاه یافت نشد یا شما مجوز حذف آن را ندارید." });
    }

    await shop.destroy();

    res.status(200).json({ msg: "فروشگاه با موفقیت حذف شد" });
  } catch (error) {
    logger.error("error in deleteShop: ", error);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};
