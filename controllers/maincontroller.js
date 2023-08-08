// const { Sequelize, QueryTypes } = require("sequelize");
const axios = require("axios");
const db = require("../config/db.config.js");
const Shop = db.Shop;
const Request = db.Request;
const geolib = require("geolib");
// const Pusher = require("pusher");
const env = require("../config/env.js");
var jwt = require("jsonwebtoken");

// const { io } = require("../server.js");

async function NearestShops() {
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
}

exports.createRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const { piece_name, content } = req.body;
    const timestamp = new Date().toISOString();

    const nearest_shops = await NearestShops();

    for (const shop of nearest_shops) {
      const newRequest = await Request.create({
        users_id: userId,
        seller_id: shop.seller_id,
        piece_name: piece_name,
        content: content,
        timestamp: timestamp,
      });

      // Emit an event to the specific seller using Socket.IO
      req.io.to(shop.seller_id).emit("newRequest", newRequest);
    }

    res.status(200).json({
      msg: "درخواست با موفقیت به نزدیک ترین فروشنده ها ارسال شد",
      piece_name,
      content,
      timestamp,
    });
  } catch (error) {
    console.error("خطا در ایجاد درخواست:", error.message);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};

exports.createResponse = async (req, res) => {
  try {
    const { request_id, price, type } = req.body;
    const timestamp = new Date().toISOString();

    const request = await Request.findByPk(request_id, {
      include: [User], // Include the User associated with the request
    });

    if (!request) {
      return res.status(404).json({ msg: "درخواست یافت نشد" });
    }

    // Save the seller's response in the database
    const newResponse = await Respond.create({
      seller_id: req.userId, // Assuming the seller's ID is obtained from authentication
      request_id: request_id,
      price: price,
      type: type,
      timestamp: timestamp,
    });

    // Emit an event to the specific seller using Socket.IO
    req.io.to(request.User.id).emit("newResponse", newResponse);

    res
      .status(200)
      .json({ msg: "پاسخ با موفقیت ارسال شد", price, type, timestamp });
  } catch (error) {
    console.error("Error creating response:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
