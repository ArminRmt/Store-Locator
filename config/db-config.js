const Sequelize = require("sequelize");

const debug_mode = process.env.DEBUG === "true";

const databaseHost = debug_mode
  ? process.env.DATABASE_HOST2
  : process.env.DATABASE_HOST;

const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: databaseHost,
  port: 32261,
  dialect: process.env.DATABASE_DIALECT,
  pool: {
    max: parseInt(process.env.DATABASE_POOL_MAX),
    min: parseInt(process.env.DATABASE_POOL_MIN),
    acquire: parseInt(process.env.DATABASE_POOL_ACQUIRE),
    idle: parseInt(process.env.DATABASE_POOL_IDLE),
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const UserModel = require("../models/UserModel.js")(sequelize, Sequelize);
const SellerModel = require("../models/seller.js")(sequelize, Sequelize);
const ShopModel = require("../models/shop.js")(sequelize, Sequelize);
const RequestModel = require("../models/request.js")(sequelize, Sequelize);
const RespondModel = require("../models/respond.js")(sequelize, Sequelize);
const RequestSellerLinksModel = require("../models/request_seller_links.js")(
  sequelize,
  Sequelize
);
const ShopReviewsModel = require("../models/shop_reviews.js")(
  sequelize,
  Sequelize
);
const SiteSettingsModel = require("../models/seitSettings.js")(
  sequelize,
  Sequelize
);

// ----------  Define associations between models   ------------

UserModel.hasMany(RequestModel, {
  foreignKey: "users_id",
  onDelete: "CASCADE",
});
RequestModel.belongsTo(UserModel, { foreignKey: "users_id" });

UserModel.hasOne(ShopReviewsModel, {
  foreignKey: "buyer_id",
  onDelete: "CASCADE",
});
ShopReviewsModel.belongsTo(UserModel, { foreignKey: "buyer_id" });

RequestModel.hasOne(RespondModel, {
  foreignKey: "request_id",
  onDelete: "CASCADE",
});
RespondModel.belongsTo(RequestModel, { foreignKey: "request_id" });

RequestModel.hasMany(RequestSellerLinksModel, {
  foreignKey: "request_id",
  onDelete: "CASCADE",
});
RequestSellerLinksModel.belongsTo(RequestModel, { foreignKey: "request_id" });

RequestSellerLinksModel.hasOne(SellerModel, {
  foreignKey: "seller_id",
  onDelete: "CASCADE",
});
SellerModel.belongsTo(RequestSellerLinksModel, { foreignKey: "seller_id" });

SellerModel.hasMany(RespondModel, {
  foreignKey: "seller_id",
  onDelete: "CASCADE",
});
RespondModel.belongsTo(SellerModel, { foreignKey: "seller_id" });

SellerModel.hasOne(ShopModel, {
  foreignKey: "seller_id",
  onDelete: "SET NULL",
});
ShopModel.belongsTo(SellerModel, { foreignKey: "seller_id" });

ShopModel.hasMany(ShopReviewsModel, {
  foreignKey: "shop_id",
  onDelete: "CASCADE",
});
ShopReviewsModel.belongsTo(ShopModel, { foreignKey: "shop_id" });

db.User = UserModel;
db.Seller = SellerModel;
db.Shop = ShopModel;
db.Request = RequestModel;
db.Respond = RespondModel;
db.RequestSellerLinks = RequestSellerLinksModel;
db.ShopReviews = ShopReviewsModel;
db.SiteSettings = SiteSettingsModel;

module.exports = db;
