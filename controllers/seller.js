const argon2 = require("argon2");
const db = require("../config/db.config.js");
const Seller = db.Seller;
const Respond = db.Respond;
const Request = db.Request;

// get seller requests
exports.SellerRequests = async (req, res) => {
  const sellerID = req.userId;
  try {
    const requests = await Request.findAll({
      where: {
        seller_id: sellerID,
      },
    });
    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching seller requests:", err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
// get seller reponds
exports.GetSellerResponds = async (req, res) => {
  const userId = req.userId;
  try {
    const sellerResponds = await Respond.findAll({
      where: {
        seller_id: userId,
      },
    });

    res.status(200).json(sellerResponds);
  } catch (err) {
    console.error("Error fetching seller responds:", err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

// get seller by token
exports.GetSellerByToken = async (req, res) => {
  try {
    const seller_id = req.userId;
    const seller = await Seller.findOne({ where: { id: seller_id } });

    res.status(200).json(seller);
  } catch (err) {
    return res.status(401).json({ message: "توکن غیر معتبر است" });
  }
};

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
