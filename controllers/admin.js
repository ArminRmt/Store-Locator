const db = require("../config/db-config.js");
const SiteSettings = db.SiteSettings;
const { logger } = require("../config/winston.js");
const { Op } = require("sequelize");
const upload = require("../config/multer.config.js");

exports.getSettingsByKeyPrefix = async (req, res) => {
  try {
    const { keyPrefix } = req.body;

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
  const key = req.body.key;
  const value = req.body.value;

  try {
    upload.single("file")(req, res, async function (error) {
      if (error instanceof multer.MulterError) {
        // Handle multer errors (e.g., file size exceeded)
        return res.status(400).json({ error: "خطای Multer: " + error.message });
      } else if (error) {
        res.status(500).json({ error: "خطای داخلی سرور" });
        logger.error("Error creating setting:", error);
      }

      // If file is uploaded successfully
      const { file } = req.body.file;

      try {
        if (file) {
          const imagePath = `uploads/${file.filename}`;

          await SiteSettings.create({
            key,
            imagePath,
          });

          return res.status(200).json({
            msg: "ایتم با موفقیت ایجاد شد.",
          });
        } else {
          await SiteSettings.create({ key, value });
          return res.status(200).json({
            msg: "ایتم با موفقیت ایجاد شد.",
          });
        }
      } catch (error) {
        res.status(500).json({ error: "خطای داخلی سرور" });
        logger.error("Error creating setting:", error);
      }
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
