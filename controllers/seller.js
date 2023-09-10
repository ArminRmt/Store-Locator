const argon2 = require("argon2");
const db = require("../config/db.config.js");
const Seller = db.Seller;

// get seller by token
exports.GetSellerByToken = async (req, res) => {
  const seller_id = req.userId;
  try {
    const seller = await Seller.findOne({ where: { id: seller_id } });

    res.status(200).json(seller);
  } catch (error) {
    console.error("error is: ", error.msg);
    return res.status(500).json({ error: "خطای سرور داخلی" });
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
    console.error("Error:", error);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};
