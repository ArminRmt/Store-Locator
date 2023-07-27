module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Phone number already exists.",
      },
      validate: {
        is: {
          args: /^\d{10}$/,
          msg: "Phone number must be a 10-digit number.", // Custom error message for regular expression validation
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM("admin", "buyer"),
      allowNull: false,
      validate: {
        notEmpty: true,
        validateRole(value) {
          if (value !== "admin" && value !== "buyer") {
            throw new Error('Role must be either "admin" or "buyer"');
          }
        },
      },
    },
  });

  return User;
};
