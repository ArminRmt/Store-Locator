const Sequelize = require("sequelize");

const debug_mode = process.env.DEBUG === "true";

const databaseHost = debug_mode
  ? process.env.DATABASE_HOST2
  : process.env.DATABASE_HOST;

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: databaseHost,
    // port: 5432,
    dialect: process.env.DATABASE_DIALECT,
    // operatorsAliases: false,
    // operators: false,

    pool: {
      max: parseInt(process.env.DATABASE_POOL_MAX),
      min: parseInt(process.env.DATABASE_POOL_MIN),
      acquire: parseInt(process.env.DATABASE_POOL_ACQUIRE),
      idle: parseInt(process.env.DATABASE_POOL_IDLE),
    },
  }
);

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
db.ShopReviews = require("../models/shop_reviews.js")(sequelize, Sequelize);

db.SiteSettings = require("../models/seitSettings.js")(sequelize, Sequelize);

// ----------  Define the relationships/associations   ------------

// User has many Requests
db.User.hasMany(db.Request, {
  foreignKey: "users_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});
// Request belongs to User
db.Request.belongsTo(db.User, { foreignKey: "users_id", targetKey: "id" });

// user has one ShopReviews
db.User.hasOne(db.ShopReviews, {
  foreignKey: "buyer_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});
// ShopReviews has one user
db.ShopReviews.belongsTo(db.User, {
  foreignKey: "buyer_id",
  targetKey: "id",
});

// Request has one Respond
db.Request.hasOne(db.Respond, {
  foreignKey: "request_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});
// Respond belongs to Request
db.Respond.belongsTo(db.Request, { foreignKey: "request_id", targetKey: "id" });

// Request has many RequestSellerLinks
db.Request.hasMany(db.RequestSellerLinks, {
  foreignKey: "request_id",
  sourceKey: "id",
  onDelete: "CASCADE",
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
  onDelete: "CASCADE",
});
// RequestSellerLinks belongs to Request
db.Seller.belongsTo(db.RequestSellerLinks, {
  foreignKey: "seller_id",
  targetKey: "id",
});

// Seller has many Respond
db.Seller.hasMany(db.Respond, {
  foreignKey: "seller_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});
// Respond belongs to Seller
db.Respond.belongsTo(db.Seller, { foreignKey: "seller_id", targetKey: "id" });

// Seller has many Shop
db.Seller.hasOne(db.Shop, {
  foreignKey: "seller_id",
  sourceKey: "id",
  onDelete: "SET NULL",
});
// Shop belongs to Seller
db.Shop.belongsTo(db.Seller, { foreignKey: "seller_id", targetKey: "id" });

// Shop has many ShopReviews
db.Shop.hasMany(db.ShopReviews, {
  foreignKey: "shop_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});
// ShopReviews belongs to Shop
db.ShopReviews.belongsTo(db.Shop, { foreignKey: "shop_id", targetKey: "id" });

module.exports = db;
