const env = require("./env.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  // operators: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/UserModel.js")(sequelize, Sequelize);
db.Seller = require("../models/seller.js")(sequelize, Sequelize);
db.Shop = require("../models/shop.js")(sequelize, Sequelize);
db.Request = require("../models/request.js")(sequelize, Sequelize);
db.Respond = require("../models/respond.js")(sequelize, Sequelize);
db.RequestSellerLinks = require("../models/request_seller_links.js")(
  sequelize,
  Sequelize
);
db.SellersReview = require("../models/sellers_reviews.js")(
  sequelize,
  Sequelize
);

// ----------  Define the relationships/associations   ------------

// User has many Requests
db.User.hasMany(db.Request, { foreignKey: "users_id", sourceKey: "id" });
// Request belongs to User
db.Request.belongsTo(db.User, { foreignKey: "users_id", targetKey: "id" });

// user has one SellersReview
db.User.hasOne(db.SellersReview, { foreignKey: "buyer_id", sourceKey: "id" });
// SellersReview has one user
db.SellersReview.belongsTo(db.User, {
  foreignKey: "buyer_id",
  targetKey: "id",
});

// Request has one Respond
db.Request.hasOne(db.Respond, { foreignKey: "request_id", sourceKey: "id" });
// Respond belongs to Request
db.Respond.belongsTo(db.Request, { foreignKey: "request_id", targetKey: "id" });

// Request has many RequestSellerLinks
db.Request.hasMany(db.RequestSellerLinks, {
  foreignKey: "request_id",
  sourceKey: "id",
});
// RequestSellerLinks belongs to Request
db.RequestSellerLinks.belongsTo(db.Request, {
  foreignKey: "request_id",
  targetKey: "id",
});

// Request has many RequestSellerLinks
db.RequestSellerLinks.hasOne(db.Seller, {
  foreignKey: "seller_id",
  sourceKey: "id",
});
// RequestSellerLinks belongs to Request
db.Seller.belongsTo(db.RequestSellerLinks, {
  foreignKey: "seller_id",
  targetKey: "id",
});

// Seller has many Respond
db.Seller.hasMany(db.Respond, { foreignKey: "seller_id", sourceKey: "id" });
// Respond belongs to Seller
db.Respond.belongsTo(db.Seller, { foreignKey: "seller_id", targetKey: "id" });

// Seller has many Shop
db.Seller.hasMany(db.Shop, { foreignKey: "seller_id", sourceKey: "id" });
// Shop belongs to Seller
db.Shop.belongsTo(db.Seller, { foreignKey: "seller_id", targetKey: "id" });

// Shop has many SellersReview
db.Shop.hasMany(db.SellersReview, { foreignKey: "shop_id", sourceKey: "id" });
// SellersReview belongs to Shop
db.SellersReview.belongsTo(db.Shop, { foreignKey: "shop_id", targetKey: "id" });

module.exports = db;
