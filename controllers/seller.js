const argon2 = require("argon2");
const db = require("../config/db-config.js");
const Seller = db.Seller;
const Shop = db.Shop;
const { logger } = require("../config/winston.js");

// get seller by token
exports.GetSellerByToken = async (req, res) => {
  const seller_id = req.userId;
  try {
    const seller = await Seller.findOne({
      where: { id: seller_id },
      attributes: ["id", "full_name", "phone", "password"],
    });

    if (!seller) {
      return res.status(404).json({ error: "فروشنده پیدا نشد" });
    }

    const shop = await Shop.findOne({
      where: { seller_id: seller_id },
      attributes: ["id"],
    });

    const shop_id = shop ? shop.id : null;

    res.status(200).json({ seller, shop_id });
  } catch (error) {
    logger.error("error in GetSellerByToken: ", error);
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
        .json({ error: "فروشنده پیدا نشد یا شما مجوز به‌روزرسانی ندارید" });
    }

    res.status(200).json({ msg: "فروشنده به‌روزرسانی شد" });
  } catch (error) {
    logger.error("error in updateSeller: ", error);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};
