module.exports = (sequelize, Sequelize) => {
  const Request = sequelize.define(
    "request",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      piece_name: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      timestamp: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          fields: ["users_id"],
        },
      ],
    }
  );

  return Request;
};
