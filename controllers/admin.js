const db = require("../config/db.config.js");
const SiteSettings = db.SiteSettings;

// Manage pages content

exports.updateNavigationItem = async (req, res) => {
  try {
    const {
      Navigation_logo,
      Navigation_title,
      Navigation_aboutus,
      Navigation_callus,
      Navigation_sabtagahi,
      Navigation_sabtfrooshgah,
    } = req.body;

    const [rowsAffected, [updatedNavigationItem]] = await SiteSettings.update(
      {
        Navigation_logo,
        Navigation_title,
        Navigation_aboutus,
        Navigation_callus,
        Navigation_sabtagahi,
        Navigation_sabtfrooshgah,
      },
      { returning: true, where: {} }
    );

    if (rowsAffected === 0) {
      return res.status(404).json({ message: "مورد ناوبری یافت نشد." });
    }

    res.status(200).json({
      message: "مورد ناوبری با موفقیت به‌روزرسانی شد.",
      updatedNavigationItem,
    });
  } catch (error) {
    console.error("Error updating navigation item:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

exports.updateFooterItem = async (req, res) => {
  try {
    const {
      Footer_sec1_header,
      Footer_sec1_item1,
      Footer_sec1_item2,
      Footer_sec2_header,
      Footer_sec2_item1,
      Footer_sec2_item2,
      Footer_sec3_header,
      Footer_sec3_item1,
      Footer_icon1,
      Footer_license,
    } = req.body;

    const [rowsAffected, [updatedFooterItem]] = await SiteSettings.update(
      {
        Footer_sec1_header,
        Footer_sec1_item1,
        Footer_sec1_item2,
        Footer_sec2_header,
        Footer_sec2_item1,
        Footer_sec2_item2,
        Footer_sec3_header,
        Footer_sec3_item1,
        Footer_icon1,
        Footer_license,
      },
      { returning: true, where: {} }
    );

    if (rowsAffected === 0) {
      return res.status(404).json({ message: "ایتم فوتر یافت نشد." });
    }

    res.status(200).json({
      message: "ایتم فوتر با موفقیت به‌روزرسانی شد.",
      updatedFooterItem,
    });
  } catch (error) {
    console.error("Error updating footer item:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

// Update Section 1
exports.updateSection1 = async (req, res) => {
  try {
    const { Section1_header, Section1_text, Section1_button } = req.body;

    const [rowsAffected, [updatedSection]] = await SiteSettings.update(
      {
        Section1_header,
        Section1_text,
        Section1_button,
      },
      { returning: true, where: {} }
    );

    if (rowsAffected === 0) {
      return res.status(404).json({ message: "بخش 1 یافت نشد." });
    }

    res
      .status(200)
      .json({ message: "بخش 1 با موفقیت به‌روزرسانی شد.", updatedSection });
  } catch (error) {
    console.error("Error updating Section 1:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

// Update Section 2
exports.updateSection2 = async (req, res) => {
  try {
    const { Section2_header, Section2_text } = req.body;

    const [rowsAffected, [updatedSection]] = await SiteSettings.update(
      {
        Section2_header,
        Section2_text,
      },
      { returning: true, where: {} }
    );

    if (rowsAffected === 0) {
      return res.status(404).json({ message: "بخش 2 یافت نشد." });
    }

    res
      .status(200)
      .json({ message: "بخش 2 با موفقیت به‌روزرسانی شد.", updatedSection });
  } catch (error) {
    console.error("Error updating Section 2:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

// Update Section 3
exports.updateSection3 = async (req, res) => {
  try {
    const { Section3_header, Section3_text, Section3_image } = req.body;

    const [rowsAffected, [updatedSection]] = await SiteSettings.update(
      {
        Section3_header,
        Section3_text,
        Section3_image,
      },
      { returning: true, where: {} }
    );

    if (rowsAffected === 0) {
      return res.status(404).json({ message: "بخش 3 یافت نشد." });
    }

    res
      .status(200)
      .json({ message: "بخش 3 با موفقیت به‌روزرسانی شد.", updatedSection });
  } catch (error) {
    console.error("Error updating Section 3:", error);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
