const env = {
  database: "storelocatorapi2",
  username: "postgres",
  password: "password",
  // host: "db",
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  port: 8080,
  pusher_appId: "1642863",
  pusher_key: "2d1185b2021a81971755",
  pusher_secret: "97baca0c0031c8539ef4",
  pusher_cluster: "ap1", // The cluster where your app is located
  pusher_useTLS: true, // Use TLS encryption
  NESHAN_KEY: "service.4f62c5a77e954852924117a7997cd4cc",
  AUTH_SECRET: "bezkoder-secret-key",
};

module.exports = env;
