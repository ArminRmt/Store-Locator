const db = require("../config/db-config.js");
const SiteSettings = db.SiteSettings;
const { logger } = require("../config/winston.js");

exports.allSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.findAll();
    if (settings.length === 0) {
      res.status(404).json({ error: "تنظیمات استاتیک سایت یافت نشد." });
    }
    res.json(settings);
  } catch (error) {
    logger.error("Error fetching settings:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getSettingByKey = async (req, res) => {
  const key = req.params.key;

  try {
    const setting = await SiteSettings.findOne({ where: { key } });

    if (!setting) {
      return res.status(404).json({ error: "تنظیم یافت نشد." });
    }

    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: "خطای داخلی سرور" });
    logger.error("Error fetching setting:", error);
  }
};

exports.createSetting = async (req, res) => {
  const { key, value } = req.body;

  try {
    const newSetting = await SiteSettings.create({ key, value });

    res.status(201).json({
      msg: "Setting successfully created.",
      newSetting,
    });
  } catch (error) {
    res.status(500).json({ error: "خطای داخلی سرور" });
    logger.error("Error creating setting:", error);
  }
};

exports.updateSetting = async (req, res) => {
  const { key, value } = req.body;

  try {
    const [rowsAffected, [updatedSetting]] = await SiteSettings.update(
      { value },
      { returning: true, where: { key } }
    );

    if (rowsAffected === 0) {
      return res.status(404).json({ error: "تنظیم یافت نشد." });
    }

    res.status(200).json({
      msg: "تنظیمات با موفقیت به‌روزرسانی شد.",
      updatedSetting,
    });
  } catch (error) {
    res.status(500).json({ error: "خطای داخلی سرور" });
    logger.error("Error updating setting:", error);
  }
};

exports.deleteSetting = async (req, res) => {
  const key = req.params.key;

  try {
    const rowsDeleted = await SiteSettings.destroy({ where: { key } });

    if (rowsDeleted === 0) {
      return res.status(404).json({ error: "تنظیم یافت نشد." });
    }

    res.status(200).json({ msg: "تنظیم با موفقیت حذف شد." });
  } catch (error) {
    res.status(500).json({ error: "خطای داخلی سرور" });
    logger.error("Error deleting setting:", error);
  }
};
