const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db-config.js");
const { initial } = require("./factory.js");
const { swaggerUi, swaggerSpecs } = require("./config/swaggerConfig.js");
const { app, server } = require("./socketManager");
const { logger } = require("./config/winston.js");

// CORS configurationl

// Middleware
app.use(
  cors({
    origin: new RegExp(
      `^(http:\/\/|https:\/\/|http:\/\/localhost:3000|https:\/\/localhost:3000|http:\/\/${process.env.LOCAL_ALLOWED_ORIGIN}|https:\/\/${process.env.PRODUCTION_ALLOWED_ORIGIN})`
    ),
  })
);
app.use(bodyParser.json());
app.use(helmet());

// Routes
const router = require("./routers/router.js");
app.use("/", router);
// test vercel
app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, { explorer: true })
);

// Database synchronization
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synchronized");
    initial();
  })
  .catch((error) => {
    logger.error("Database synchronization failed:", error);
  });

// Server listening
const serverInstance = server.listen(parseInt(process.env.PORT), () => {
  console.log(`App listening on port ${parseInt(process.env.PORT)}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Received SIGINT. Closing server gracefully.");
  serverInstance.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
