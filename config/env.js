const isDocker = process.env.DOCKER === "true";

const env = {
  database: "storelocatorapi2",
  username: "postgres",
  password: "password",
  host: isDocker ? "storelocator-db" : "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  port: 8080,
  NESHAN_KEY: "service.4f62c5a77e954852924117a7997cd4cc",
  AUTH_SECRET: "bezkoder-secret-key",
};

module.exports = env;
