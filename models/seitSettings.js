module.exports = (sequelize, Sequelize) => {
  const SiteSettings = sequelize.define(
    "site_settings",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      key: {
        type: Sequelize.STRING,
        unique: true,
      },
      value: {
        type: Sequelize.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );

  return SiteSettings;
};
