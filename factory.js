const db = require("./config/db.config.js");
const argon2 = require("argon2");
const { logger } = require("./config/winston.js");

const User = db.User;
const Seller = db.Seller;
const Shop = db.Shop;
const Request = db.Request;
const Respond = db.Respond;
const RequestSellerLinks = db.RequestSellerLinks;

async function initial() {
  try {
    const hashedPassword = await argon2.hash("123456789");

    const userPromises = [
      User.create({
        phone: "98765432100",
        full_name: "armin",
        password: hashedPassword,
        role: "buyer",
      }),
      User.create({
        phone: "98765432111",
        full_name: "admin",
        password: hashedPassword,
        role: "admin",
      }),
    ];

    const sellerPromises = [
      await Seller.create({
        full_name: "صادق چیتگر",
        phone: "09111184505",
        password: hashedPassword,
      }),

      await Seller.create({
        full_name: "یونس نیک بین",
        phone: "09111184506",
        password: hashedPassword,
      }),
    ];

    const shopPromises = [
      await Shop.create({
        seller_id: 1,
        name: "لوازم یدکی مدیران یدک با مدیریت صادق چیتگر",
        phone: "09111184505",
        bio: "لوازم یدکی مدیران یدک با مدیریت صادق چیتگر در محله مراد بیگ بابل و در بلوار امام رضا واقع شده است. از لحاظ موقعیت جغرافیایی این مکان در نزدیکی مراکزی مانند پاساژ شهریار و موزه گنجینه بابل و فرمانداری ویژه شهرستان بابل و بیمارستان شهید بهشتی و بیمارستان آیت‌الله روحانی قرار گرفته است.",
        address: "بابل،مراد بیگ،بلوار امام رضا",
        open_time: "08:00:00",
        avg_rating: 3.8,
        latitude: 36.5384,
        longitude: 52.6822,
      }),

      await Shop.create({
        seller_id: 1,
        name: "ایران خودرو",
        phone: "1234567895",
        bio: "ایران خودرو در محله کیجا تکیه بابل و در خیابان ولی عصر واقع شده است. از لحاظ موقعیت جغرافیایی این مکان در نزدیکی مراکزی مانند تجهیزات و یراق آلات رضا و بستنی عمو رحیم و رستوران سنتی برگ ریزان و دانشگاه صنعتی نوشیروانی بابل و شیرینی سرای بابل قرار گرفته است.",
        address: "بابل،کیجا تکیه،خ. ولی عصر",
        open_time: "08:00:00",
        avg_rating: 3,
        latitude: 36.565,
        longitude: 52.684,
      }),

      await Shop.create({
        seller_id: 1,
        name: "فروشگاه لوازم خودرو mvm حسن پور",
        phone: "09111134882",
        bio: "",
        address: "امیرکلا, بلوار ساحلی امیرکلا, نرسیده به امام خمینی, امیرکلا",
        open_time: "09:00:00",
        avg_rating: 3,
        latitude: 36.5879,
        longitude: 52.6723,
      }),

      await Shop.create({
        seller_id: 1,
        name: "مرکز فروش تخصصی لنت ترمز/ دیوا لنت",
        phone: "09119092808",
        bio: "مرکز فروش تخصصی لنت ترمز در محله موزیرج شمالی بابل و در خیابان ارشاد چهاردهم،خیابان کنارگذر واقع شده است. از لحاظ موقعیت جغرافیایی این مکان در نزدیکی مراکزی مانند مرکز معاینه فنی خودروهای سبک رنجبر و ورزشگاه شهید باباگلی موزیرج و تعمیرگاه تخصصی ترمز و تعمیرات دوچرخه امیر و درمانگاه شبانه‌روزی مهرآبادیان قرار گرفته است.",
        address: "بابل،موزیرج شمالی،خ. ارشاد چهاردهم،خ. کنارگذر",
        open_time: "09:00:00",
        avg_rating: 3,
        latitude: 36.5349,
        longitude: 52.6528,
      }),

      await Shop.create({
        seller_id: 1,
        name: "فروشگاه الماس یدک",
        phone: "09379387447",
        bio: "فروشگاه الماس یدک در محله کیجا تکیه بابل و در خیابان بهشتی واقع شده است. از لحاظ موقعیت جغرافیایی این مکان در نزدیکی مراکزی مانند شهربازی پارک نوشیروانی و رستوران سنتی برگ ریزان و کله پزی شاخ طلا و شیرینی سرای سان سیتی و شیرینی سرای بابل قرار گرفته است.",
        address: "بابل،کیجا تکیه،خ. بهشتی",
        open_time: "08:00:00",
        avg_rating: 3,
        latitude: 36.5349,
        longitude: 52.6528,
      }),
    ];

    const requestPromises = [
      await Request.create({
        users_id: 1,
        piece_name: "لنت ترمز",
        content: "لنت ترمز ماشین سمند ef7",
        timestamp: new Date().toISOString(),
      }),

      await Request.create({
        users_id: 1,
        piece_name: "فیلتر هوا",
        content: "فیلتر هوا برای خودروی من مدل جدید",
        timestamp: new Date().toISOString(),
      }),

      await Request.create({
        users_id: 1,
        piece_name: "رادیاتور",
        content: "رادیاتور خودرویم احتیاج به تعمیر داره",
        timestamp: new Date("2023-09-06T00:00:00.000Z").toISOString(),
      }),

      await Request.create({
        users_id: 1,
        piece_name: "روغن موتور",
        content: "روغن موتور بهترین مارک را پیشنهاد بدهید",
        timestamp: new Date().toISOString(),
      }),

      await Request.create({
        users_id: 1,
        piece_name: "جلوبندی",
        content: "جلوبندی خودرو نیاز به تعویض دارد",
        timestamp: new Date().toISOString(),
      }),

      await Request.create({
        users_id: 1,
        piece_name: "باتری",
        content: "باتری ماشینم دچار مشکل شده است",
        timestamp: new Date().toISOString(),
      }),

      await Request.create({
        users_id: 1,
        piece_name: "چراغ جلو",
        content: "چراغ جلو خودروم خاموش نمی‌شود",
        timestamp: new Date().toISOString(),
      }),

      await Request.create({
        users_id: 1,
        piece_name: "دینامو",
        content: "دینامو خودرو نیاز به تعویض دارد",
        timestamp: new Date("2023-09-03T00:00:00.000Z").toISOString(),
      }),

      await Request.create({
        users_id: 1,
        piece_name: "تسمه تایمینگ",
        content: "تسمه تایمینگ خودرو تازه تعویض شده است",
        timestamp: new Date().toISOString(),
      }),

      await Request.create({
        users_id: 1,
        piece_name: "ترمز دستی",
        content: "ترمز دستی ماشینم کار نمی‌کند",
        timestamp: new Date().toISOString(),
      }),
    ];

    const respondPromises = [
      Respond.create({
        seller_id: 1,
        request_id: 1,
        price: 10,
        seller_respond: "موجود",
        timestamp: new Date().toISOString(),
        is_deleted: false,
      }),
    ];

    await Promise.all([
      ...userPromises,
      ...sellerPromises,
      ...shopPromises,
      ...requestPromises,
      ...respondPromises,
    ]);

    await RequestSellerLinks.create({
      request_id: 1,
      seller_id: 1,
      status: 0,
    });

    // for (let i = 0; i < 10; i++) {
    //   await Respond.create({
    //     seller_id: 1,
    //     request_id: 1,
    //     price: 10,
    //     seller_respond: `Fake seller_respond ${i}`,
    //     timestamp: new Date().toISOString(),
    //     is_deleted: false,
    //   });
    // }

    console.log("Data initialization completed successfully!");
  } catch (error) {
    logger.error(`Error initializing data: ${error.message}`);
  }
}

module.exports = { initial };
