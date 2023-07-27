const { Sequelize, QueryTypes } = require("sequelize");
const axios = require("axios");

// sudo apt-get update
// sudo apt-get install postgis
// in pg admin : make this querries
// CREATE EXTENSION postgis;        CREATE EXTENSION IF NOT EXISTS postgis;
// SELECT PostGIS_version();    SELECT PostGIS_version();

// Function to get the nearest sellers based on user's location (latitude and longitude) within a certain distance (in meters)

// async function getNearestSellers(
//   userLatitude,
//   userLongitude,
//   distanceInMeters,
//   limit
// ) {
//   try {
//     const query = `
//             SELECT shops.id, shops.seller_id, shops.name, shops.phone, shops.bio, shops.address, shops.open_time, shops.avg_rating, shops.latitude, shops.longitude
//             FROM shops
//             WHERE ST_DWithin(ST_MakePoint(longitude, latitude)::geography, ST_MakePoint(:userLongitude, :userLatitude)::geography, :distanceInMeters)
//             LIMIT :limit;
//         `;

//     const shops = await Sequelize.query(query, {
//       replacements: {
//         userLongitude,
//         userLatitude,
//         distanceInMeters,
//         limit,
//       },
//       type: QueryTypes.SELECT,
//     });

//     return shops;
//   } catch (error) {
//     console.error("Error getting nearest sellers:", error);
//     throw error;
//   }
// }

// handle user's request and find nearest sellers
// async function handle_user_request(req, res) {
//   try {
//     // latitude = '0';
//     // longitude = '0';

//     const users_id = req.userId;
//     const { piece_name, content } = req.body;
//     const timestamp = new Date().toISOString();

//     const newRequest = await Request.create({
//       users_id,
//       piece_name,
//       content,
//       timestamp,
//     });

//     const nearestSellers = await getNearestSellers(
//       latitude,
//       longitude,
//       1000,
//       10
//     );

//     res.json({ requestId: newRequest.id, nearestSellers });
//   } catch (error) {
//     console.error("Error handling user request:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// // handle seller's response to a user's request
// async function handle_seller_respond() {
//   try {
//     const { seller_id, request_id, price, type } = req.body;

//     const timestamp = new Date().toISOString();
//     const newResponse = await Respond.create({
//       seller_id,
//       request_id,
//       price,
//       type,
//       timestamp,
//     });

//     res.json({ responseId: newResponse.id });
//   } catch (error) {
//     console.error("Error handling seller response:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// Function to calculate the Haversine distance between two points
// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371; // Earth's radius in km
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c;
//   return distance;
// }

// Function to get nearest shops to a user based on their location
async function getNearestShops(userLatitude, userLongitude, maxDistance = 10) {
  try {
    const query = `
      SELECT
        shop_id,
        latitude,
        longitude
      FROM
        shops
      WHERE
        ST_Distance(
          ST_GeomFromText('POINT(:userLongitude :userLatitude)', 4326)::geography,
          ST_GeomFromText('POINT(longitude latitude)', 4326)::geography
        ) <= :distanceInMeters
      ORDER BY
        ST_Distance(
          ST_GeomFromText('POINT(:userLongitude :userLatitude)', 4326)::geography,
          ST_GeomFromText('POINT(longitude latitude)', 4326)::geography
        )
      LIMIT 10;`;

    const shops = await sequelize.query(query, {
      replacements: {
        userLongitude,
        userLatitude,
        distanceInMeters: maxDistance * 1000,
      },
      type: QueryTypes.SELECT,
    });

    return shops;
  } catch (err) {
    throw new Error("Error fetching nearest shops: " + err.message);
  }
}

exports.AddressToPoint = async (req, res) => {
  const { address } = req.body;

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

    userLongitude = response.data.location.x;
    userLatitude = response.data.location.y;

    const nearestShops = await getNearestShops(userLatitude, userLongitude, 5);

    res.status(200).json(nearestShops);
  } catch (error) {
    console.error("Error fetching user location:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
