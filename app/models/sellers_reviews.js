module.exports = (sequelize, Sequelize) => {
    const SellersReview = sequelize.define('sellers_review', {
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
      },
      feedback_text: {
        type: Sequelize.TEXT,
      },
      timestamp: {
        type: Sequelize.DATE,
      },
    });
  

    return SellersReview;
  };
  