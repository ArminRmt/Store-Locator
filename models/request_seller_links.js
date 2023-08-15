module.exports = (sequelize, Sequelize) => {
  const RequestSellerLinks = sequelize.define("request_seller_links", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    request_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    seller_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return RequestSellerLinks;
};
