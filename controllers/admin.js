const db = require("../config/db.config.js");
const SiteSettings = db.SiteSettings;

exports.allSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.findAll();
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.getSettingByKey = async (req, res) => {
  const key = req.params.key;

  try {
    const setting = await SiteSettings.findOne({ where: { key } });

    if (!setting) {
      return res.status(404).json({ msg: "تنظیم یافت نشد." });
    }

    res.json(setting);
  } catch (error) {
    console.error("Error fetching setting:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
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
    console.error("خطا در به‌روزرسانی تنظیم:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
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
      return res.status(404).json({ msg: "تنظیم یافت نشد." });
    }

    res.status(200).json({
      msg: "تنظیمات با موفقیت به‌روزرسانی شد.",
      updatedSetting,
    });
  } catch (error) {
    console.error("خطا در به‌روزرسانی تنظیم:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.deleteSetting = async (req, res) => {
  const key = req.params.key;

  try {
    const rowsDeleted = await SiteSettings.destroy({ where: { key } });

    if (rowsDeleted === 0) {
      return res.status(404).json({ msg: "تنظیم یافت نشد." });
    }

    res.status(200).json({ msg: "تنظیم با موفقیت حذف شد." });
  } catch (error) {
    console.error("Error deleting setting:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
