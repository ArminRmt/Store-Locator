const db = require("../config/db-config.js");
const ShopReviews = db.ShopReviews;
const Shop = db.Shop;
const { logger } = require("../config/winston.js");

exports.getShopFeedbackTexts = async (req, res) => {
  const { shop_id } = req.body;
  const logedinSeller = req.userId;
  const page = req.query.page || 1;
  try {
    const pageSize = 10;

    const offset = (page - 1) * pageSize;

    const shop = await Shop.findOne({
      where: { seller_id: logedinSeller },
      attributes: ["seller_id"],
    });

    if (!shop || shop.seller_id !== logedinSeller) {
      return res
        .status(403)
        .json({ error: "شما دسترسی به این فروشگاه را ندارید." });
    }

    const { count, rows: feedbackTexts } = await ShopReviews.findAndCountAll({
      where: { shop_id },
      attributes: ["feedback_text"],
      limit: pageSize,
      offset: offset,
    });

    if (count === 0) {
      return res.status(404).json({ error: "هیچ متن بازخوردی یافت نشد" });
    }
    const totalPages = Math.ceil(count / pageSize);

    res.status(200).json({ feedbackTexts, totalPages });
  } catch (error) {
    logger.error(`Error fetching feedback texts: ${error}`);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.getUserFeedbackTexts = async (req, res) => {
  const userId = req.userId;
  const page = req.query.page || 1;
  try {
    const pageSize = 10;

    const offset = (page - 1) * pageSize;

    const { count, rows: feedbackTexts } = await ShopReviews.findAndCountAll({
      where: { buyer_id: userId },
      attributes: ["feedback_text"],
      limit: pageSize,
      offset: offset,
    });

    if (count === 0) {
      return res.status(404).json({ error: "هیچ متن بازخوردی یافت نشد" });
    }
    const totalPages = Math.ceil(count / pageSize);

    res.status(200).json({ feedbackTexts, totalPages });
  } catch (error) {
    logger.error(`Error fetching feedback texts: ${error}`);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

// TODO Move Calculation to a Background Task (create queue worker for this)
const calculateAverageRating = async (shopId) => {
  try {
    // Fetch shop reviews
    const shopReviews = await ShopReviews.findAll({
      where: { shop_id: shopId },
      attributes: ["rating", "buyer_id"],
    });

    if (!shopReviews || shopReviews.length === 0) {
      throw new Error("هیچ نقدی برای این فروشگاه یافت نشد");
    }

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

    // Update the shop's average rating
    await Shop.update({ avg_rating: averageRating }, { where: { id: shopId } });
  } catch (error) {
    logger.error("Error calculating average rating:", error);
    throw error;
  }
};

exports.submitShopRating = async (req, res) => {
  const { shop_id, rating, feedback_text } = req.body;
  const buyer_id = req.userId;
  try {
    const newReview = await ShopReviews.create({
      shop_id,
      buyer_id,
      rating,
      feedback_text,
    });

    // Calculate average rating and update shop's avg_rating
    if (rating !== null) {
      await calculateAverageRating(shop_id);
    }

    res.status(200).json({ msg: "امتیاز و بازخورد با موفقیت ارسال شد." });
  } catch (error) {
    if (error.message === "هیچ نقدی برای این فروشگاه یافت نشد") {
      res.status(400).json({ error: error.message });
    } else {
      logger.error(`Error submitting rating and feedback: ${error.message}`);
      res.status(500).json({ error: "خطای داخلی سرور" });
    }
  }
};

exports.updateShopReview = async (req, res) => {
  const { review_id, rating, feedback_text } = req.body;

  try {
    const updateFields = {};

    if (rating !== undefined) updateFields.rating = rating;
    if (feedback_text !== undefined) updateFields.feedback_text = feedback_text;

    const [rowsAffected, [updatedReview]] = await ShopReviews.update(
      updateFields,
      {
        returning: true,
        where: { id: review_id, buyer_id: req.userId },
      }
    );

    if (rowsAffected === 0) {
      return res.status(404).json({ error: "نقد یافت نشد." });
    }

    // Check if rating has changed and recalculate average if necessary
    if (rating !== null && updatedReview.rating !== rating) {
      await calculateAverageRating(updatedReview.shop_id);
    }

    res.status(200).json({ msg: "نقد با موفقیت به‌روزرسانی شد." });
  } catch (error) {
    if (error.message === "هیچ نقدی برای این فروشگاه یافت نشد") {
      res.status(400).json({ error: error.message });
    } else {
      logger.error(`Error updating review: ${error.message}`);
      res.status(500).json({ error: "خطای داخلی سرور" });
    }
  }
};

exports.deleteShopReview = async (req, res) => {
  const { review_id } = req.body;

  try {
    const reviewToDelete = await ShopReviews.findOne({
      where: {
        id: review_id,
        buyer_id: req.userId,
      },
    });

    if (!reviewToDelete) {
      return res
        .status(404)
        .json({ error: "نقد یافت نشد یا شما مجوز حذف آن را ندارید." });
    }

    const shopId = reviewToDelete.shop_id;
    await reviewToDelete.destroy();

    // Recalculate average rating for the associated shop
    await calculateAverageRating(shopId);

    res.status(200).json({ msg: "نقد با موفقیت حذف شد." });
  } catch (error) {
    if (error.message === "هیچ نقدی برای این فروشگاه یافت نشد") {
      res.status(400).json({ error: error.message });
    } else {
      logger.error(`Error deleting review: ${error.message}`);
      res.status(500).json({ error: "خطای داخلی سرور" });
    }
  }
};
