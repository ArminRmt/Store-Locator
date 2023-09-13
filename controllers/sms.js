const smsProvider = require("twilio"); // or any other SMS provider
const db = require("../config/db.config.js");
const User = db.User;
const argon2 = require("argon2");
// const env = require("../config/env.js");
const jwt = require("jsonwebtoken");

// Generate a random 6-digit verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to send SMS
async function sendVerificationCode(phone, verificationCode) {
  try {
    // Use SMS provider to send the verification code to the user's phone number
    const msg = await smsProvider.sendSMS({
      to: phone,
      body: `Your verification code is: ${verificationCode}`,
    });
    return msg;
  } catch (error) {
    throw new Error("Failed to send verification code");
  }
}

// Route to send the verification code to the user's phone
exports.ForgotPassword = async (req, res) => {
  const phone = req.body.phone;

  const user = await User.findOne({ phone });
  if (!user) {
    return res.status(404).send({ error: "کاربر یافت نشد" });
  }

  const verificationCode = generateVerificationCode();
  const hashedCode = await argon2.hash(verificationCode);
  const verificationCodeExpiresAt = Date.now() + 10 * 60 * 1000; // expires in 10 minutes

  try {
    await sendVerificationCode(phone, verificationCode);

    // Save the hashed verification code and its expiry time in the database
    await user.updateOne(
      { phone },
      {
        verificationCode: hashedCode,
        verificationCodeExpiresAt,
      }
    );
    res.status(200).json({ msg: "کد تایید ارسال شد", verificationCode });
  } catch (error) {
    console.error("error is: ", error.msg);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};

// Route to handle the verification code submitted by the user
exports.VerifyCode = async (req, res) => {
  try {
    const verificationCode = req.body.verificationCode;
    const user = await User.findOne({
      verificationCode: {
        $eq: await argon2.hash(verificationCode),
      },
    });

    if (
      !user ||
      !(await argon2.verify(user.verificationCode, verificationCode)) ||
      Date.now() > user.verificationCodeExpiresAt
    ) {
      res.status(400).json({ error: "کد تأیید نامعتبر یا منقضی شده است" });
    }

    // const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
    //   algorithm: "HS256",
    //   allowInsecureKeySizes: true,
    //   expiresIn: "1h",
    // });

    // res.status(200).json({ msg: "Verification code is valid", token });
    res.status(200).json({ msg: "کد تأیید معتبر است", user });
  } catch (error) {
    console.error("error is: ", error.msg);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};

// Route to update the password after successful verification
exports.ResetPassword = async (req, res) => {
  const password = req.body.password;
  const user = req.body.user;

  try {
    // const user = await GetUserByToken();

    user.password = await argon2.hash(password);

    // Reset the verification code after successful password update
    user.verificationCode = "";
    user.verificationCodeExpiresAt = null;

    // Save the updated user object
    await user.save();

    res.status(200).json({ msg: "تغییر رمز عبور با موفقیت انجام شد" });
  } catch (error) {
    console.error("error is: ", error.msg);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};

exports.GetUserByToken = async (req, res) => {
  let authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send({
      error: "پیام: هیچ توکنی ارائه نشده است!",
    });
  }

  let token = authHeader.replace("Bearer ", "");

  try {
    const decoded = await jwt.verify(token, process.env.AUTH_SECRET);
    const userId = decoded.id;

    const user = await User.findOne({ where: { id: userId } });

    res.status(200).json(user);
  } catch (error) {
    console.error("error is: ", error.msg);
    res.status(500).json({ error: "خطای سرور داخلی" });
  }
};
