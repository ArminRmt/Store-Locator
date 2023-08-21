const db = require("../config/db.config.js");
const ShopReviews = db.ShopReviews;
const Shop = db.Shop;

exports.getShopFeedbackTexts = async (req, res) => {
  try {
    const { shop_id } = req.body;
    const logedinSeller = req.userId;

    const shop = await Shop.findOne({ where: { seller_id: logedinSeller } });

    if (shop.seller_id !== logedinSeller) {
      return res
        .status(403)
        .json({ message: "شما دسترسی به این فروشگاه را ندارید." });
    }

    const feedbackTexts = await ShopReviews.findAll({
      attributes: ["feedback_text"],
      where: { shop_id },
    });

    res.status(200).json(feedbackTexts);
  } catch (error) {
    console.error("Error fetching feedback texts:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.getUserFeedbackTexts = async (req, res) => {
  try {
    const userId = req.userId;

    const shop = await Shop.findOne({ where: { buyer_id: userId } });

    if (shop.buyer_id !== userId) {
      return res
        .status(403)
        .json({ message: "شما صاحب این نقد ها نمی باشید." });
    }

    const feedbackTexts = await ShopReviews.findAll({
      attributes: ["feedback_text"],
      where: { buyer_id: userId },
    });

    res.status(200).json(feedbackTexts);
  } catch (error) {
    console.error("Error fetching feedback texts:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

const calculateAverageRating = async (shopId) => {
  const shopReviews = await ShopReviews.findAll({
    where: { shop_id: shopId },
    attributes: ["rating", "buyer_id"], // Include buyer_id to consider unique buyers
  });

  // Calculate unique ratings based on buyer_id
  const uniqueRatings = {};
  shopReviews.forEach((review) => {
    if (review.rating !== null) {
      if (!uniqueRatings[review.buyer_id]) {
        uniqueRatings[review.buyer_id] = review.rating;
      }
    }
  });

  // Calculate total ratings and count only non-null ratings
  const totalRatings = Object.values(uniqueRatings).reduce(
    (sum, rating) => sum + rating,
    0
  );
  const countRatings = Object.keys(uniqueRatings).length;
  const averageRating = countRatings > 0 ? totalRatings / countRatings : 0;

  await Shop.update({ avg_rating: averageRating }, { where: { id: shopId } });
};

exports.submitShopRating = async (req, res) => {
  try {
    const { shop_id, rating, feedback_text } = req.body;
    const buyer_id = req.userId;

    const newReview = await ShopReviews.create({
      shop_id,
      buyer_id,
      rating,
      feedback_text,
    });

    // Calculate average rating and update shop's avg_rating
    await calculateAverageRating(shop_id);

    res.status(200).json({ message: "امتیاز و بازخورد با موفقیت ارسال شد." });
  } catch (error) {
    console.error("Error submitting rating and feedback:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.updateShopReview = async (req, res) => {
  try {
    const { review_id, rating, feedback_text } = req.body;

    const reviewToUpdate = await ShopReviews.findByPk(review_id);

    if (!reviewToUpdate) {
      res.status(200).json({ message: "نقد با موفقیت به‌روزرسانی شد." });
    }

    const oldRating = reviewToUpdate.rating;

    if (rating !== null) {
      reviewToUpdate.rating = rating;
    }
    if (feedback_text !== null) {
      reviewToUpdate.feedback_text = feedback_text;
    }

    await reviewToUpdate.save();

    // Recalculate average rating only if the rating has changed
    if (rating !== null && oldRating !== rating) {
      await calculateAverageRating(reviewToUpdate.shop_id);
    }

    res.status(200).json({ message: "نقد با موفقیت به‌روزرسانی شد." });
  } catch (error) {
    console.error("Error updating review:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.deleteShopReview = async (req, res) => {
  try {
    const { review_id } = req.body;

    const reviewToDelete = await SellerReview.findByPk(review_id);

    if (!reviewToDelete) {
      return res.status(404).json({ message: "Review not found." });
    }

    const shopId = reviewToDelete.shop_id;
    await reviewToDelete.destroy();

    // Recalculate average rating for the associated shop
    await calculateAverageRating(shopId);

    res.status(200).json({ message: "نقد با موفقیت حذف شد." });
  } catch (error) {
    console.error("Error deleting review:", error.message);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
