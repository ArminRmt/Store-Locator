module.exports = (sequelize, Sequelize) => {
  const Shop = sequelize.define(
    "shop",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
      },
      open_time: {
        type: Sequelize.TIME,
      },
      avg_rating: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      latitude: {
        type: Sequelize.NUMERIC(10, 6),
      },
      longitude: {
        type: Sequelize.NUMERIC(10, 6),
      },
    },
    {
      // Disable timestamps
      timestamps: false,
      indexes: [
        {
          fields: ["seller_id"],
        },
      ],
    }
  );

  return Shop;
};
