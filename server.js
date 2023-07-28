const express = require("express");
const db = require("./app/config/db.config.js");
const cors = require("cors");
let router = require("./app/routers/router.js");
var bodyParser = require("body-parser");
const env = require("./app/config/env.js");
const argon2 = require("argon2");
const User = db.User;
const Seller = db.Seller;
const Shop = db.Shop;

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync with { force: true }");
  initial();
  // initial2();
});

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/", router);

// Create a Server
const server = app.listen(env.port, function () {
  console.log(`App listening on port ${env.port}`);
});

// Initialize Database with Default Users

async function initial() {
  try {
    User.create({
      phone: "9876543210",
      full_name: "armin",
      password: await argon2.hash("123456789"),
      role: "buyer",
    });

    User.create({
      phone: "9876543211",
      full_name: "admin",
      password: await argon2.hash("123456789"),
      role: "admin",
    });

    const seller = await Seller.create({
      full_name: "seller1",
      phone: "9876543213",
      password: await argon2.hash("123456789"),
    });

    await Shop.create({
      seller_id: seller.id,
      name: "Shop1",
      phone: "1234567890",
      bio: "This is a sample shop.",
      address: "123 Main Street",
      open_time: "08:00:00",
      avg_rating: 4.5,
      latitude: 51.7,
      longitude: 36.7,
    });

    await Shop.create({
      seller_id: seller.id,
      name: "Shop2",
      phone: "1234567895",
      bio: "This is a sample shop.",
      address: "123 Main Street",
      open_time: "08:00:00",
      avg_rating: 5,
      latitude: 52.8,
      longitude: 37.8,
    });

    await Shop.create({
      seller_id: seller.id,
      name: "Shop3",
      phone: "1234567896",
      bio: "This is a sample shop.",
      address: "123 Main Street",
      open_time: "08:00:00",
      avg_rating: 6,
      latitude: 51.9,
      longitude: 36.9,
    });

    console.log("Data initialization completed successfully!");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
}
