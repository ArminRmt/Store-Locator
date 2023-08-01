module.exports = (sequelize, Sequelize) => {
  const Respond = sequelize.define("respond", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seller_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    request_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.NUMERIC(10, 2),
    },
    type: {
      type: Sequelize.STRING,
    },
    timestamp: {
      type: Sequelize.DATE,
    },
  });

  return Respond;
};
