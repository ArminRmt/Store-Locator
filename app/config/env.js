const env = {
  database: "storelocatorapi2",
  username: "postgres",
  password: "password",
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  port: 8080,
};

module.exports = env;
