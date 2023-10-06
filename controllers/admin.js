const db = require("../config/db-config.js");
const SiteSettings = db.SiteSettings;
const { logger } = require("../config/winston.js");
const { Op } = require("sequelize");

exports.getSettingsByKeyPrefix = async (req, res) => {
  try {
    const { keyPrefix } = req.params;

    const settings = await SiteSettings.findAll({
      where: {
        key: {
          [Op.like]: `${keyPrefix}%`,
        },
      },
    });

    if (settings.length === 0) {
      res
        .status(404)
        .json({ error: `تنظیمات با پیش‌وند کلید '${keyPrefix}' یافت نشد.` });
      return;
    }

    const result = {};
    settings.forEach((setting) => {
      result[setting.key] = setting.value;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "خطای داخلی سرور" });
    logger.error("Error fetching settings:", error);
  }
};

exports.getSettingByKey = async (req, res) => {
  const key = req.params;

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

exports.createOrUpdateSetting = async (req, res) => {
  const key = req.body.key;
  const value = req.body.value;

  try {
    if (req.file) {
      const value = `uploads/${req.file.filename}`;
      const existingSetting = await SiteSettings.findOne({ where: { key } });

      if (existingSetting) {
        await SiteSettings.update({ value }, { where: { key } });
      } else {
        await SiteSettings.create({ key, value });
      }
    } else {
      const existingSetting = await SiteSettings.findOne({ where: { key } });

      if (existingSetting) {
        await SiteSettings.update({ value }, { where: { key } });
      } else {
        await SiteSettings.create({ key, value });
      }
    }

    return res.status(200).json({
      msg: "ایتم با موفقیت ایجاد/به‌روزرسانی شد.",
    });
  } catch (error) {
    console.error("Error creating/updating setting:", error);
    return res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.deleteSetting = async (req, res) => {
  const key = req.params;

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
