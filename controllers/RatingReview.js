const db = require("../config/db.config.js");
const ShopReviews = db.ShopReviews;
const Shop = db.Shop;

exports.getShopFeedbackTexts = async (req, res) => {
  try {
    const { shop_id } = req.body;
    const logedinSeller = req.userId;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;

    const offset = (page - 1) * pageSize;

    const shop = await Shop.findOne({
      where: { seller_id: logedinSeller },
      attributes: ["seller_id"],
    });

    if (shop.seller_id !== logedinSeller) {
      return res
        .status(403)
        .json({ message: "شما دسترسی به این فروشگاه را ندارید." });
    }

    const feedbackTexts = await ShopReviews.findAll({
      where: { shop_id },
      attributes: ["feedback_text"],
      limit: pageSize,
      offset: offset,
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
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;

    const offset = (page - 1) * pageSize;

    const feedbackTexts = await ShopReviews.findAll({
      where: { buyer_id: userId },
      attributes: ["feedback_text"],
      limit: pageSize,
      offset: offset,
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

    const [rowsAffected, [updatedReview]] = await ShopReviews.update(
      {
        rating: rating,
        feedback_text: feedback_text,
      },
      {
        returning: true,
        where: { id: review_id, buyer_id: req.userId },
      }
    );

    if (rowsAffected === 0) {
      return res.status(404).json({ message: "نقد یافت نشد." });
    }

    // Check if rating has changed and recalculate average if necessary
    if (rating !== null && updatedReview.rating !== rating) {
      await calculateAverageRating(updatedReview.shop_id);
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

    const reviewToDelete = await ShopReviews.findOne({
      where: {
        id: review_id,
        buyer_id: req.userId,
      },
    });

    if (!reviewToDelete) {
      return res
        .status(404)
        .json({ message: "نقد یافت نشد یا شما مجوز حذف آن را ندارید." });
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
