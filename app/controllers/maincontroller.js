// const { Sequelize, QueryTypes } = require("sequelize");
const axios = require("axios");
const db = require("../config/db.config.js");
const Shop = db.Shop;
const Request = db.Request;
const geolib = require("geolib");
const Pusher = require("pusher");

async function SendResponse() {
  try {
    const pusher = new Pusher({
      appId: "1642863",
      key: "2d1185b2021a81971755",
      secret: "97baca0c0031c8539ef4",
      cluster: "ap1", // The cluster where your app is located
      useTLS: true, // Use TLS encryption
    });

    // Trigger a notification event to the specific user using a private channel
    pusher.trigger(`private-seller-${sellerId}`, "new_response", {
      message: "پاسخ فروشنده",
      request: request,
    });
  } catch (error) {
    throw error;
  }
}

async function SendReqest(sellerId, request) {
  try {
    const pusher = new Pusher({
      appId: "1642863",
      key: "2d1185b2021a81971755",
      secret: "97baca0c0031c8539ef4",
      cluster: "ap1", // The cluster where your app is located
      useTLS: true, // Use TLS encryption
    });

    // Trigger a notification event to the specific seller using a private channel
    pusher.trigger(`private-seller-${sellerId}`, "new_request", {
      message: "درخواست جدید از یک کاربر!",
      request: request,
    });
  } catch (error) {
    throw error;
  }
}

async function NearestShops() {
  const address = "مازندران نوشهر هفت تیر هفت تیر ۱۰";
  NESHAN_KEY = "service.4f62c5a77e954852924117a7997cd4cc";

  try {
    const response = await axios.get("https://api.neshan.org/v4/geocoding", {
      params: {
        address,
      },
      headers: {
        "Api-Key": NESHAN_KEY,
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
    // const SellersID = [];

    for (const shop of nearest_shops) {
      const newRequest = await Request.create({
        users_id: userId,
        seller_id: shop.seller_id,
        piece_name: piece_name,
        content: content,
        timestamp: timestamp,
      });
      // send requests to shops
      SendReqest(shop.seller_id, newRequest);
      // SellersID.push(shop.seller_id);
    }

    res.status(200).json(createdRequests);
  } catch (error) {
    console.error("خطا در ایجاد درخواست:", error.message);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};
