const redis = require("redis");

// Initialize and configure Redis client
const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  legacyMode: true,
});

// Connect Redis client
redisClient.connect();

// Event handler for Redis client errors
redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

module.exports = redisClient;
