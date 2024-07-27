// const MelipayamakApi = require("melipayamak-api");
// const redisClient = require("../config/redis.config.js");

// // Initialize Melipayamak API with your username and password
// const username = "09384020591";
// const password = "GLY37";
// const api = new MelipayamakApi(username, password);
// const sms = api.sms();
// // const smsSoap = api.sms("soap");

// // Store verification code and message ID in Redis
// async function storeVerificationCode(phone, code) {
//   return new Promise((resolve, reject) => {
//     redisClient.set(phone, code, "EX", 3600, (err, reply) => {
//       if (err) {
//         logger.error("Error storing verification code:", err);
//         reject(err);
//       } else {
//         resolve(reply);
//       }
//     });
//   });
// }

// async function sendVerificationCode(phone) {
//   try {
//     const verificationCode = generateVerificationCode();

//     const text = "تست وب سرویس ملی پیامک";
//     const from = "50002710020591";
//     const smsResponse = await sms.send(phone, from, text);
//     console.log(smsResponse);

//     // Store the verification code and message ID in Redis
//     await storeVerificationCode(phone, verificationCode);

//     return verificationCode;
//   } catch (error) {
//     logger.error("Error sending verification code:", error);
//     throw error;
//   }
// }

// // Function to send SMS verification code
// // async function sendVerificationCode(phone) {
// //   try {
// //     const verificationCode = generateVerificationCode();
// //     // const text = `Your verification code is: ${verificationCode}`;
// //     const text = `
// //     کاربر گرامی
// //     کد تایید شما {۰} میباشد
// //     https://localstorelocator.liara.run/
// //     `;
// //     const text = [verificationCode];

// //     // Send SMS verification code
// //     smsSoap.sendByBaseNumber(text, phone, bodyId);

// //     // Store the verification code and message ID in Redis
// //     await storeVerificationCode(phone, text);

// //     return verificationCode;
// //   } catch (error) {
// //     logger.error("Error sending verification code:", error);
// //     throw error;
// //   }
// // }

// // Controller method for sending verification code
// async function sendVerificationCodeController(req, res) {
//   try {
//     const { phone } = req.body;
//     const code = await sendVerificationCode(phone);
//     res.status(200).json({ code });
//   } catch (error) {
//     res.status(500).json({ error: "ارسال کد تأیید ناموفق بود" });
//     logger.error("Error sending verification code:", error);
//   }
// }

// // Delete verification code from Redis
// async function deleteVerificationCode(phone) {
//   return new Promise((resolve, reject) => {
//     redisClient.del(phone, (err, reply) => {
//       if (err) {
//         logger.error("Error Delete verification code:", err);
//         reject(err);
//       } else {
//         resolve(reply);
//       }
//     });
//   });
// }

// // Retrieve verification code from Redis
// async function retrieveVerificationCode(phone) {
//   return new Promise((resolve, reject) => {
//     redisClient.get(phone, (err, reply) => {
//       if (err) {
//         logger.error("Error retrieving verification code:", err);
//         reject(err);
//       } else {
//         resolve(reply);
//       }
//     });
//   });
// }

// // verify the received verification code
// async function verifyCode(phone, receivedCode) {
//   try {
//     const storedCode = await retrieveVerificationCode(phone);

//     // numeric part of the stored code
//     const numericStoredCode = storedCode.replace(/\D/g, "");

//     if (receivedCode === numericStoredCode) {
//       await deleteVerificationCode(phone);
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     logger.error("Error verifying code:", error);
//     throw error;
//   }
// }

// // Controller method for verifying the received code
// async function verifyCodeController(req, res) {
//   try {
//     const { phone, code } = req.body;
//     const isVerified = await verifyCode(phone, code);
//     res.status(200).json({ verified: isVerified });
//   } catch (error) {
//     logger.error("Error verifying code:", error);
//     res.status(500).json({ error: "بررسی کد ناموفق بود" });
//   }
// }

// // Helper function to generate a random 6-digit verification code
// function generateVerificationCode() {
//   return Math.floor(100000 + Math.random() * 900000);
// }

// module.exports = {
//   sendVerificationCodeController,
//   verifyCodeController,
// };
