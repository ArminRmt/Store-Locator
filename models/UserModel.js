module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
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
      role: {
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
      timestamps: false,
      // indexes: [
      //   {
      //     fields: ["phone"],
      //   },
      // ],
    }
  );

  return User;
};
