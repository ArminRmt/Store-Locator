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
  RequireFieldsRequest,
  RequireFieldsRespond,
} = require("../middleware/ValidateInputs.js");

////////////////////////////////////      authorization     ////////////////////////////////////

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
router.post("/signinSeller", auth.signinSeller);

////////////////////////////////////      user routes     ////////////////////////////////////

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

// get user details by token
router.get("/getuserbytoken", users.GetUserByToken);
// get user all requests
router.get("/UserRequests", authJwt.verifyToken, users.GetUserRequest);

////////////////////////////////////      seller routes     ////////////////////////////////////

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

// get seller details by token
router.get("/GetSellerByToken", authJwt.verifyToken, seller.GetSellerByToken);
// get sellers all responds
router.get("/GetSellerResponds", authJwt.verifyToken, seller.GetSellerResponds);

////////////////////////////////////      shop routes     ////////////////////////////////////

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

////////////////////////////////////      main routes     ////////////////////////////////////

// buyer craete request and it will sends to nearest sellers
router.post(
  "/createRequest",
  [authJwt.verifyToken, RequireFieldsRequest],
  maincontroller.createRequest
);

// seller respond back to buyer request
router.post(
  "/createResponse",
  [authJwt.verifyToken, RequireFieldsRespond],
  maincontroller.createResponse
);

module.exports = router;
