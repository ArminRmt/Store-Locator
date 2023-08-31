module.exports = (sequelize, Sequelize) => {
  const RequestSellerLinks = sequelize.define(
    "request_seller_links",
    {
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
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1]], // Only allow values 0 or 1
        },
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

  return RequestSellerLinks;
};
