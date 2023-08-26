module.exports = (sequelize, Sequelize) => {
  const Seller = sequelize.define(
    "seller",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      verificationCode: {
        type: Sequelize.STRING, // INTEGER
        allowNull: true,
      },
      verificationCodeExpiresAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      // Disable timestamps
      timestamps: false,
    }
  );

  return Seller;
};
