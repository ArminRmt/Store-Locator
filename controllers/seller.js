const argon2 = require("argon2");
const db = require("../config/db.config.js");
const Seller = db.Seller;

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

// Update a seller by ID
exports.updateSeller = async (req, res) => {
  const { full_name, phone, password } = req.body;

  try {
    const hashPassword = await argon2.hash(password);

    const [rowsAffected, [updatedSeller]] = await Seller.update(
      {
        full_name,
        phone,
        password: hashPassword,
      },
      {
        returning: false,
        where: {
          id: request_id,
          users_id: req.userId,
        },
      }
    );

    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ msg: "فروشنده پیدا نشد یا شما مجوز به‌روزرسانی ندارید" });
    }

    res.status(200).json({ msg: "فروشنده به‌روزرسانی شد" });
  } catch (error) {
    res.status(500).json({ msg: "خطای سرور" });
  }
};
