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
      return res.status(404).json({ message: "Navigation item not found." });
    }

    res.status(200).json({
      message: "Navigation item updated successfully.",
      updatedNavigationItem,
    });
  } catch (error) {
    console.error("Error updating navigation item:", error);
    res.status(500).json({ error: "Internal server error" });
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
      return res.status(404).json({ message: "Footer item not found." });
    }

    res.status(200).json({
      message: "Footer item updated successfully.",
      updatedFooterItem,
    });
  } catch (error) {
    console.error("Error updating footer item:", error);
    res.status(500).json({ error: "Internal server error" });
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
      return res.status(404).json({ message: "Section 1 not found." });
    }

    res
      .status(200)
      .json({ message: "Section 1 updated successfully.", updatedSection });
  } catch (error) {
    console.error("Error updating Section 1:", error);
    res.status(500).json({ error: "Internal server error" });
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
      return res.status(404).json({ message: "Section 2 not found." });
    }

    res
      .status(200)
      .json({ message: "Section 2 updated successfully.", updatedSection });
  } catch (error) {
    console.error("Error updating Section 2:", error);
    res.status(500).json({ error: "Internal server error" });
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
      return res.status(404).json({ message: "Section 3 not found." });
    }

    res
      .status(200)
      .json({ message: "Section 3 updated successfully.", updatedSection });
  } catch (error) {
    console.error("Error updating Section 3:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
