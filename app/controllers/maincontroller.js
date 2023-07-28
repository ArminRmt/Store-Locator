// const { Sequelize, QueryTypes } = require("sequelize");
const axios = require("axios");
const db = require("../config/db.config.js");
const Shop = db.Shop;
const Request = db.Request;
const geolib = require("geolib");
const { route } = require("../routers/router.js");
// const Pusher = require('pusher');

async function SendReqest(sellerIds) {
  try {
    const pusher = new Pusher({
      appId: "YOUR_APP_ID",
      key: "YOUR_APP_KEY",
      secret: "YOUR_APP_SECRET",
      cluster: "YOUR_APP_CLUSTER", // The cluster where your app is located
      useTLS: true, // Use TLS encryption
    });

    sellerIds.forEach((sellerId) => {
      pusher.trigger(`private-seller-${sellerId}`, "new_request", {
        message: "New request from a user!",
        request: req.body, // Include any relevant request details
      });
    });
  } catch (error) {
    throw error;
  }
}

async function NearestShops() {
  const address = "مازندران نوشهر هفت تیر هفت تیر ۱۰";
  YOUR_API_KEY = "service.4f62c5a77e954852924117a7997cd4cc";

  try {
    const response = await axios.get("https://api.neshan.org/v4/geocoding", {
      params: {
        address,
      },
      headers: {
        "Api-Key": YOUR_API_KEY,
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
    const SellersID = [];

    for (const shop of nearest_shops) {
      const newRequest = await Request.create({
        users_id: userId,
        seller_id: shop.seller_id,
        piece_name: piece_name,
        content: content,
        timestamp: timestamp,
      });
      SellersID.push(shop.seller_id);
    }

    // send requests to shops
    SendReqest(SellersID);

    res.status(200).json(createdRequests);
  } catch (error) {
    console.error("Error Creating request:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
