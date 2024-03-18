const db = require("../config/db-config.js");
const SiteSettings = db.SiteSettings;
const { logger } = require("../config/winston.js");
const { Op } = require("sequelize");
const { sellerSockets, userSockets } = require("../socketManager.js");
const User = db.User;
const Seller = db.Seller;
const uniqueVisitors = new Set();

exports.countUniqueVisitors = (req, res) => {
  try {
    const userIp = req.ip;

    if (!uniqueVisitors.has(userIp)) {
      uniqueVisitors.add(userIp);
    }

    const uniqueVisitorsCount = uniqueVisitors.size;

    res.json({ uniqueVisitors: uniqueVisitorsCount });
  } catch (error) {
    res.status(500).json({ error: "خطای داخلی سرور" });
    logger.error("Error counting unique visitors:", error);
  }
};

exports.getUserStatistics = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalSellers = await Seller.count();
    const activeUsers = Object.keys(userSockets).length;
    const activeSellers = Object.keys(sellerSockets).length;

    const statistics = {
      totalUsers,
      totalSellers,
      activeUsers,
      activeSellers,
    };

    res.json(statistics);
  } catch (error) {
    res.status(500).json({ error: "خطای داخلی سرور" });
    logger.error("Error fetching user statistics:", error);
  }
};

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
  const filename = req.file ? `uploads/${req.file.filename}` : null;

  try {
    const existingSetting = await SiteSettings.findOne({ where: { key } });

    if (existingSetting) {
      await SiteSettings.update(
        { value: filename || value },
        { where: { key } }
      );

      return res.status(200).json({
        msg: "ایتم با موفقیت به‌روزرسانی شد.",
      });
    } else {
      await SiteSettings.create({ key, value: filename || value });

      return res.status(200).json({
        msg: "ایتم با موفقیت ایجاد شد.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "خطای داخلی سرور" });
    logger.error("Error creating/updating setting:", error);
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
