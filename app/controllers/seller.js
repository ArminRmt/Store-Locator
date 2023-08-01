const argon2 = require("argon2");
const db = require("../config/db.config.js");
const Seller = db.Seller;

// Get a seller by ID
exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findByPk(req.params.id);

    if (seller) {
      res.status(200).json(seller);
    } else {
      res.status(404).json({ message: "فروشنده یافت نشد" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای سرور" });
  }
};

// Get all sellers
exports.getSellers = async (req, res) => {
  try {
    const response = await Seller.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update a seller by ID
exports.updateSeller = async (req, res) => {
  const { full_name, phone, password } = req.body;

  try {
    const seller = await Seller.findByPk(req.params.id);

    if (!seller) {
      return res.status(404).json({ msg: "فروشنده یافت نشد" });
    }

    const hashPassword = await argon2.hash(password);

    await seller.update({ full_name, phone, password: hashPassword });
    res.status(200).json({ msg: "فروشنده به‌روزرسانی شد" });
  } catch (error) {
    res.status(500).json({ msg: "خطای سرور" });
  }
};

// Delete a seller by ID
exports.deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findByPk(req.params.id);

    if (!seller) {
      return res.status(404).json({ message: "فروشنده یافت نشد" });
    }

    await seller.destroy();

    res.status(200).json({ message: "فروشنده با موفقیت حذف شد" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای سرور" });
  }
};
