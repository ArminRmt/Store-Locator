module.exports = (sequelize, Sequelize) => {
  const Respond = sequelize.define(
    "respond",
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
      request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.NUMERIC(10, 2),
      },
      seller_respond: {
        type: Sequelize.STRING,
      },
      timestamp: {
        type: Sequelize.DATE,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    },
    {
      // Disable timestamps
      timestamps: false,
      indexes: [
        {
          fields: ["seller_id"],
        },
        {
          fields: ["request_id"],
        },
      ],
    }
  );

  return Respond;
};
