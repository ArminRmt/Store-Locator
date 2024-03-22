// const MelipayamakApi = require("melipayamak-api");
const redisClient = require("../config/redis.config.js");

// Initialize Melipayamak API with your username and password
// const username = "your_username";
// const password = "your_password";
// const api = new MelipayamakApi(username, password);
// const smsSoap = api.sms("soap");

// Store verification code and message ID in Redis
async function storeVerificationCode(phone, code) {
  return new Promise((resolve, reject) => {
    redisClient.set(phone, code, "EX", 3600, (err, reply) => {
      if (err) {
        console.log("Error storing verification code:", err);
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

// Function to send SMS verification code
async function sendVerificationCode(phone) {
  try {
    const verificationCode = generateVerificationCode();
    const text = `Your verification code is: ${verificationCode}`;

    // Store the verification code and message ID in Redis
    await storeVerificationCode(phone, text);

    return verificationCode;
  } catch (error) {
    console.log("Error sending verification code:", error);
    throw error;
  }
}

// Controller method for sending verification code
async function sendVerificationCodeController(req, res) {
  try {
    const { phone } = req.body;
    const code = await sendVerificationCode(phone);
    res.status(200).json({ code });
  } catch (error) {
    res.status(500).json({ error: "Failed to send verification code" });
    console.log("Error sending verification code:", error);
  }
}

// Delete verification code from Redis
async function deleteVerificationCode(phone) {
  return new Promise((resolve, reject) => {
    redisClient.del(phone, (err, reply) => {
      if (err) {
        console.log("Error Delete verification code:", err);
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

// Retrieve verification code from Redis
async function retrieveVerificationCode(phone) {
  return new Promise((resolve, reject) => {
    redisClient.get(phone, (err, reply) => {
      if (err) {
        console.log("Error retrieving verification code:", err);
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

// verify the received verification code
async function verifyCode(phone, receivedCode) {
  try {
    const storedCode = await retrieveVerificationCode(phone);

    console.log("Received code :", receivedCode);
    console.log("Stored code :", storedCode);

    // numeric part of the stored code
    const numericStoredCode = storedCode.replace(/\D/g, "");

    if (receivedCode === numericStoredCode) {
      await deleteVerificationCode(phone);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error verifying code:", error);
    throw error;
  }
}

// Controller method for verifying the received code
async function verifyCodeController(req, res) {
  try {
    const { phone, code } = req.body;
    const isVerified = await verifyCode(phone, code);
    res.status(200).json({ verified: isVerified });
  } catch (error) {
    res.status(500).json({ error: "Failed to verify code" });
    console.log("Error verifying code:", error);
  }
}

// Helper function to generate a random 6-digit verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

module.exports = {
  sendVerificationCodeController,
  verifyCodeController,
};
