module.exports = (sequelize, Sequelize) => {
  const Seller = sequelize.define("seller", {
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
          msg: "Phone number must be a 10-digit number.",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Seller;
};
