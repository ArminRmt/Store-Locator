let express = require("express");
let router = express.Router();

const users = require("../controllers/UserController.js");
const auth = require("../controllers/auth.js");
const maincontroller = require("../controllers/maincontroller.js");
const shop = require("../controllers/shop.js");
const seller = require("../controllers/seller.js");

const authJwt = require("../middleware/authJwt");

// authorization
router.post("/user-admin/signup", auth.signup);
router.post("/seller/signup", auth.seller_signup);
router.post("/signin", auth.signin);

// user routes
router.get("/users", [authJwt.verifyToken, authJwt.isAdmin], users.getUsers);
router.get(
  "/user/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  users.getUserById
);
router.patch(
  "/user/:id",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  users.updateUser
);
router.delete(
  "/user/:id",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  users.deleteUser
);

// seller routes
router.get(
  "/sellers",
  [authJwt.verifyToken, authJwt.isAdmin],
  seller.getSellers
);
router.get(
  "/seller/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  seller.getSellerById
);
router.patch(
  "/seller/:id",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  seller.updateSeller
);
router.delete(
  "/seller/:id",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  seller.deleteSeller
);

// shop routes
router.get("/shops", [authJwt.verifyToken, authJwt.isAdmin], shop.getShops);
router.get(
  "/shop/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  shop.getShopById
);
router.post(
  "/shop/:id",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  shop.createShop
);
router.patch(
  "/shop/:id",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  shop.updateShop
);
router.delete(
  "/shop/:id",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  shop.deleteShop
);

// request
// router.post('/request/create',[authJwt.verifyToken], maincontroller.handle_user_request)

// router.get("/NearestShops", maincontroller.NearestShops);
router.get("/createRequest", authJwt.verifyToken, maincontroller.createRequest);

module.exports = router;
