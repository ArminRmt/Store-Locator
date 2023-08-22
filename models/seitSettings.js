module.exports = (sequelize, Sequelize) => {
  const SiteSettings = sequelize.define("site_settings", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Navigation_logo: {
      type: Sequelize.STRING,
    },
    Navigation_title: {
      type: Sequelize.STRING,
    },
    Navigation_aboutus: {
      type: Sequelize.STRING,
    },
    Navigation_callus: {
      type: Sequelize.STRING,
    },
    Navigation_sabtagahi: {
      type: Sequelize.STRING,
    },
    Navigation_sabtfrooshgah: {
      type: Sequelize.STRING,
    },
    Footer_sec1_header: {
      type: Sequelize.STRING,
    },
    Footer_sec1_item1: {
      type: Sequelize.STRING,
    },
    Footer_sec1_item2: {
      type: Sequelize.STRING,
    },
    Footer_sec2_header: {
      type: Sequelize.STRING,
    },
    Footer_sec2_item1: {
      type: Sequelize.STRING,
    },
    Footer_sec2_item2: {
      type: Sequelize.STRING,
    },
    Footer_sec3_header: {
      type: Sequelize.STRING,
    },
    Footer_sec3_item1: {
      type: Sequelize.STRING,
    },
    Footer_icon1: {
      type: Sequelize.STRING,
    },
    Footer_license: {
      type: Sequelize.STRING,
    },
    Section1_header: {
      type: Sequelize.STRING,
    },
    Section1_text: {
      type: Sequelize.STRING,
    },
    Section1_button: {
      type: Sequelize.STRING,
    },
    Section2_header: {
      type: Sequelize.STRING,
    },
    Section2_text: {
      type: Sequelize.STRING,
    },
    Section3_header: {
      type: Sequelize.STRING,
    },
    Section3_text: {
      type: Sequelize.STRING,
    },
    Section3_image: {
      type: Sequelize.STRING,
    },
  });

  return SiteSettings;
};
