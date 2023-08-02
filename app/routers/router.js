let express = require("express");
let router = express.Router();

const users = require("../controllers/UserController.js");
const auth = require("../controllers/auth.js");
const maincontroller = require("../controllers/maincontroller.js");
const shop = require("../controllers/shop.js");
const seller = require("../controllers/seller.js");

const authJwt = require("../middleware/authJwt");

const {
  validatePassword,
  validatePasswordMatch,
  ValidateRole,
  validatePhoneNumber,
  validateName,
  RequireFieldsSeller,
  RequireFieldsUser,
  RequireFieldsShop,
} = require("../middleware/ValidateInputs.js");

// authorization
router.post(
  "/user-admin/signup",
  [
    validatePassword,
    validatePasswordMatch,
    ValidateRole,
    validatePhoneNumber,
    validateName,
    RequireFieldsUser,
  ],
  auth.signup
);
router.post(
  "/seller/signup",
  [
    validatePassword,
    validatePasswordMatch,
    validatePhoneNumber,
    validateName,
    RequireFieldsSeller,
  ],
  auth.seller_signup
);
router.post("/signin", auth.signin);

// test get user details after signin
router.get("/getuserbytoken", users.GetUserByToken);

// user routes
router.get(
  "/user/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  users.getUserById
);

router.get("/users", [authJwt.verifyToken, authJwt.isAdmin], users.getUsers);
router.get(
  "/user/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  users.getUserById
);
router.patch(
  "/user/:id",
  [
    authJwt.verifyToken,
    authJwt.isUserOrAdmin,
    validatePassword,
    validatePasswordMatch,
    ValidateRole,
    validatePhoneNumber,
    validateName,
    RequireFieldsUser,
  ],
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
  [
    authJwt.verifyToken,
    authJwt.isUserOrAdmin,
    validatePassword,
    validatePasswordMatch,
    validatePhoneNumber,
    validateName,
    RequireFieldsSeller,
  ],
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
  [
    authJwt.verifyToken,
    authJwt.isSellerOrAdmin,
    validatePhoneNumber,
    validateName,
    RequireFieldsShop,
  ],
  shop.createShop
);
router.patch(
  "/shop/:id",
  [
    authJwt.verifyToken,
    authJwt.isSellerOrAdmin,
    validatePhoneNumber,
    validateName,
    RequireFieldsShop,
  ],
  shop.updateShop
);
router.delete(
  "/shop/:id",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  shop.deleteShop
);

// request
// router.post('/request/create',[authJwt.verifyToken], maincontroller.handle_user_request)

router.get("/createRequest", authJwt.verifyToken, maincontroller.createRequest);

module.exports = router;
