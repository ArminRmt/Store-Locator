let express = require("express");
let router = express.Router();

const users = require("../controllers/UserController.js");
const auth = require("../controllers/auth.js");
const shop = require("../controllers/shop.js");
const seller = require("../controllers/seller.js");
const request = require("../controllers/request.js");
const respond = require("../controllers/respond.js");
const RatingReview = require("../controllers/RatingReview.js");
const admin = require("../controllers/admin.js");

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

router.patch(
  "/updateUser",
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

// get user details by token
router.get("/getuserbytoken", users.GetUserByToken);

////////////////////////////////////      seller routes     ////////////////////////////////////

router.patch(
  "/updateSeller",
  [
    authJwt.verifyToken,
    authJwt.isSeller,
    validatePassword,
    validatePasswordMatch,
    validatePhoneNumber,
    validateName,
    RequireFieldsSeller,
  ],
  seller.updateSeller
);

// get seller details by token
router.get("/GetSellerByToken", authJwt.verifyToken, seller.GetSellerByToken);

////////////////////////////////////      shop routes     ////////////////////////////////////

// get all logged in seller shops
router.get("/getShops", [authJwt.verifyToken, authJwt.isAdmin], shop.getShops);

// get seller shop
router.get("/getSellerShop/:id", authJwt.verifyToken, shop.getSellerShop);

// create shop
router.post(
  "/createShop",
  [
    authJwt.verifyToken,
    authJwt.isSellerOrAdmin,
    validatePhoneNumber,
    validateName,
    RequireFieldsShop,
  ],
  shop.createShop
);

// seller update his shop
router.patch(
  "/updateShop",
  [
    authJwt.verifyToken,
    authJwt.isSeller,
    validatePhoneNumber,
    validateName,
    RequireFieldsShop,
  ],
  shop.updateShop
);

// serller or admin delete shop
router.delete(
  "/shopDelete",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  shop.deleteShop
);

////////////////////////////////////    request routes   ////////////////////////////////////

// get user all requests
router.get(
  "/userRequests",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  request.GetUserRequest
);

// get request details
router.get(
  "/GetRequest/:id",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  request.GetRequest
);

// get seller request
router.get(
  "/sellerRequests",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  request.SellerRequests
);

// buyer craete request and it will sends to nearest sellers
router.post(
  "/createRequest",
  [authJwt.verifyToken, authJwt.isUserOrAdmin, RequireFieldsRequest],
  request.createRequest
);

// buyer update his request
router.patch(
  "/UpdateRequest",
  [authJwt.verifyToken, authJwt.isBuyer, RequireFieldsRequest],
  request.UpdateRequest
);

router.delete(
  "/DeleteRequest",
  [authJwt.verifyToken, authJwt.isBuyer],
  request.DeleteRequest
);

////////////////////////////////////    respond routes   ////////////////////////////////////

// get user all responds
// router.get(
//   "/getUserResponses",
//   [authJwt.verifyToken, authJwt.isUserOrAdmin],
//   respond.getUserResponses
// );

// router.get(
//   "/responsesBasedonRequest",
//   [authJwt.verifyToken, authJwt.isUserOrAdmin],
//   respond.responsesBasedonRequest
// );

// get user responds for specific request
router.get(
  "/UserRequestResponses/:id",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  respond.UserRequestResponses
);

// get sellers all responds
router.get(
  "/GetSellerResponds",
  authJwt.verifyToken,
  respond.GetSellerResponds
);

// seller respond back to buyer request
router.post(
  "/createResponse",
  [authJwt.verifyToken, authJwt.isSeller, RequireFieldsRespond],
  respond.createResponse
);

// seller update his respond
router.patch(
  "/UpdateResponse",
  [authJwt.verifyToken, authJwt.isSeller, RequireFieldsRespond],
  respond.UpdateResponse
);

// seller delete his respond
router.delete(
  "/DeleteResponse",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  respond.DeleteResponse
);

// Buyer panel - Delete a response
router.patch(
  "/deleteUserResponse",
  [authJwt.verifyToken, authJwt.isBuyer],
  respond.deleteUserResponse
);

////////////////////////////////////    RatingReview routes   ////////////////////////////////////

// get all reviews on this shop
router.get(
  "/getShopFeedbackTexts",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  RatingReview.getShopFeedbackTexts
);

// get all user feedbacks
router.get(
  "/getUserFeedbackTexts",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  RatingReview.getUserFeedbackTexts
);

router.post(
  "/submitShopRating",
  [authJwt.verifyToken, authJwt.isBuyer, RequireFieldsRating],
  RatingReview.submitShopRating
);

// user update his review
router.patch(
  "/updateShopReview",
  [authJwt.verifyToken, authJwt.isBuyer, RequireFieldsRating],
  RatingReview.updateShopReview
);

router.delete(
  "/deleteShopReview",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  RatingReview.deleteShopReview
);

////////////////////////////////////    siteSettings routes   ////////////////////////////////////

router.get(
  "/settings",
  // [authJwt.verifyToken, authJwt.isAdmin],
  admin.allSettings
);

router.get(
  "/getSetting/:key",
  // [authJwt.verifyToken, authJwt.isAdmin],
  admin.getSettingByKey
);

router.post(
  "/createSetting",
  [authJwt.verifyToken, authJwt.isAdmin],
  admin.createSetting
);

router.patch(
  "/updateSetting",
  [authJwt.verifyToken, authJwt.isAdmin],
  admin.updateSetting
);

router.delete(
  "/deleteSetting/:key",
  [authJwt.verifyToken, authJwt.isAdmin],
  admin.deleteSetting
);

////////////////////////////////////    other routes   ////////////////////////////////////

// router.get("/verify-token", authJwt.verifyToken);

router.get("/verify-token", authJwt.verifyToken, (req, res) => {
  // If the token is valid, the middleware will have added userId to the request
  res.status(200).send({
    message: "توکن معتبر است.",
  });
});

module.exports = router;
