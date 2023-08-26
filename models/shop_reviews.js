module.exports = (sequelize, Sequelize) => {
  const ShopReviews = sequelize.define(
    "shop_reviews",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shop_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      buyer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      feedback_text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      timestamp: {
        type: Sequelize.DATE,
      },
    },
    {
      // Disable timestamps
      timestamps: false,
    }
  );

  return ShopReviews;
};
