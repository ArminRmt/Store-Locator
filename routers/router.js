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
const messageVerify = require("../controllers/sms.js");

const authJwt = require("../middleware/authJwt");

const upload = require("../config/multer.config.js");

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
  // validatePhoneNumberUpdate,
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

router.post("/admin/signin", auth.signin);
router.post("/user/signin", auth.signin);
router.post("/signinSeller", auth.signinSeller);

////////////////////////////////////      user routes     ////////////////////////////////////

router.patch(
  "/updateUser",
  [
    authJwt.verifyToken,
    authJwt.isUserOrAdmin,
    validatePassword,
    validatePasswordMatch,
    validatePhoneNumber,
    validateName,
    // RequireFieldsUser,
  ],
  users.updateUser
);

// router.get("/home", (req, res) => {
//   res.status(200).json("Liara working . . .");
// });
// http://localhost:8081/home

router.get("/home", (req, res) => {
  // If the token is valid, the middleware will have added userId to the request
  res.status(200).send({
    msg: "Liara working . . .",
  });
  // next();
});

// get user details by token
router.get("/getuserbytoken", authJwt.verifyToken, users.GetUserByToken);

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
    // RequireFieldsSeller,
  ],
  seller.updateSeller
);

// get seller details by token
router.get("/GetSellerByToken", authJwt.verifyToken, seller.GetSellerByToken);

////////////////////////////////////      shop routes     ////////////////////////////////////

// get all logged in seller shops
router.get("/getShops", [authJwt.verifyToken, authJwt.isAdmin], shop.getShops);

// get seller shop
router.get("/getSellerShop/:id", shop.getSellerShop);

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
  [authJwt.verifyToken, authJwt.isSeller, validatePhoneNumber, validateName],
  shop.updateShop
);

// serller or admin delete shop
router.delete(
  "/shopDelete",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  shop.deleteShop
);

////////////////////////////////////    request routes   ////////////////////////////////////

// Auto-completion route
router.get(
  "/autoComplete",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  request.autoComplete
);

// get user all requests based on search
router.get(
  "/searchRequests",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  request.searchRequests
);

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
  [authJwt.verifyToken, authJwt.isBuyer],
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

// Auto-completion route
router.get(
  "/autoCompleteRespond",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  respond.autoCompleteRespond
);

// get seller all responds based on search
router.get(
  "/searchResponses",
  [authJwt.verifyToken, authJwt.isSellerOrAdmin],
  respond.searchResponses
);

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
  [authJwt.verifyToken, authJwt.isSeller],
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
  [authJwt.verifyToken, authJwt.isBuyer],
  RatingReview.updateShopReview
);

router.delete(
  "/deleteShopReview",
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  RatingReview.deleteShopReview
);

////////////////////////////////////    siteSettings routes   ////////////////////////////////////

router.get("/homePageSettings/:keyPrefix", admin.getSettingsByKeyPrefix);

router.get(
  "/getSetting/:key",
  [authJwt.verifyToken, authJwt.isAdmin],
  admin.getSettingByKey
);

router.post(
  "/createOrUpdateSetting",
  [authJwt.verifyToken, authJwt.isAdmin, upload.single("file")],
  admin.createOrUpdateSetting
);

router.delete(
  "/deleteSetting/:key",
  [authJwt.verifyToken, authJwt.isAdmin],
  admin.deleteSetting
);

////////////////////////////////////    message routes   ////////////////////////////////////

// Route for sending verification code
router.post(
  "/send-verification-code",
  // validatePhoneNumber,
  messageVerify.sendVerificationCodeController
);

// Route for verifying code
router.post("/verify-code", messageVerify.verifyCodeController);

////////////////////////////////////    other routes   ////////////////////////////////////

// router.get("/verify-token", authJwt.verifyToken);

router.get("/verify-token", authJwt.verifyToken, (req, res) => {
  // If the token is valid, the middleware will have added userId to the request
  res.status(200).send({
    msg: "توکن معتبر است.",
  });
  // next();
});

module.exports = router;
