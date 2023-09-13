require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db.config.js");
// const env = require("./config/env.js");
const { initial } = require("./factory.js");
const { swaggerUi, specs } = require("./config/swaggerConfig.js");
const { server } = require("./socketManager");
// const { logger } = require("./config/winston.js");

const app = express();

// CORS configurationl
const allowedOrigins = [
  process.env.LOCAL_ALLOWED_ORIGIN,
  process.env.PRODUCTION_ALLOWED_ORIGIN,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // You might need this for certain scenarios
  optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 200
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(helmet());

// Routes
const router = require("./routers/router.js");
app.use("/", router);

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Database synchronization
db.sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
    initial();
  })
  .catch((error) => {
    console.error("Database synchronization failed:", error);
  });

// Server listening
const serverInstance = server.listen(8080, () => {
  // logger.info(`App listening on port ${8080}`);
  console.log(`App listening on port ${8080}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Received SIGINT. Closing server gracefully.");
  serverInstance.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

module.exports = app;
