let express = require("express");
let router = express.Router();

const users = require("../controllers/UserController.js");
const auth = require("../controllers/auth.js");
const shop = require("../controllers/shop.js");
const seller = require("../controllers/seller.js");
const request = require("../controllers/request.js");
const respond = require("../controllers/respond.js");
const RatingReview = require("../controllers/RatingReview.js");

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
  RequireFieldsRating,
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
    authJwt.isSellerOrAdmin,
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
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  seller.deleteSeller
);

// get seller details by token
router.get("/GetSellerByToken", authJwt.verifyToken, seller.GetSellerByToken);

// get sellers all responds
router.get(
  "/GetSellerResponds",
  authJwt.verifyToken,
  respond.GetSellerResponds
);

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

////////////////////////////////////    request routes   ////////////////////////////////////

// get user all requests
router.get("/UserRequests", authJwt.verifyToken, request.GetUserRequest);

// get seller request
router.get("/SellerRequests", authJwt.verifyToken, request.SellerRequests);

// buyer craete request and it will sends to nearest sellers
router.post(
  "/createRequest",
  [authJwt.verifyToken, RequireFieldsRequest],
  request.createRequest
);

// buyer update his request
router.patch(
  "/UpdateRequest",
  [authJwt.verifyToken, RequireFieldsRequest],
  request.UpdateRequest
);

// buyer delete his request
router.delete("/DeleteRequest", [authJwt.verifyToken], request.DeleteRequest);

////////////////////////////////////    respond routes   ////////////////////////////////////

// get user all responds
router.get("/getUserResponses", authJwt.verifyToken, respond.getUserResponses);

// seller respond back to buyer request
router.post(
  "/createResponse",
  [authJwt.verifyToken, RequireFieldsRespond],
  respond.createResponse
);

// seller update his respond
router.patch(
  "/UpdateResponse",
  [authJwt.verifyToken, RequireFieldsRespond],
  respond.UpdateResponse
);

// seller delete his respond
router.delete("/DeleteResponse", [authJwt.verifyToken], respond.DeleteResponse);

////////////////////////////////////    RatingReview routes   ////////////////////////////////////

// get all reviews on this shop
router.get(
  "/getShopFeedbackTexts",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  RatingReview.getShopFeedbackTexts
);

// get all user feedback on this shop
router.get(
  "/getUserFeedbackTexts",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  RatingReview.getShopFeedbackTexts
);

router.post(
  "/submitShopRating",
  [authJwt.verifyToken, authJwt.isUserOrAdmin, RequireFieldsRating],
  RatingReview.submitShopRating
);

router.patch(
  "/updateShopReview",
  [authJwt.verifyToken, authJwt.isUserOrAdmin, RequireFieldsRating],
  RatingReview.updateShopReview
);
router.delete(
  "/deleteShopReview",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  RatingReview.deleteShopReview
);

////////////////////////////////////    other routes   ////////////////////////////////////

router.get("/verify-token", authJwt.verifyToken, (req, res) => {
  // If the token is valid, the middleware will have added userId to the request
  res.status(200).send({
    message: "توکن معتبر است.",
  });
});

module.exports = router;
