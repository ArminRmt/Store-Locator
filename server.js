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

// CORS configuration

// Middleware
app.use(
  cors({
    origin: new RegExp(
      `^(http:\/\/|https:\/\/|http:\/\/localhost:3000|https:\/\/localhost:3000|http:\/\/${process.env.LOCAL_ALLOWED_ORIGIN}|https:\/\/${process.env.PRODUCTION_ALLOWED_ORIGIN}|http:\/\/${process.env.ANDROID_ALLOWED_ORIGIN}|http:\/\/${process.env.ANDROID_ALLOWED_ORIGIN})`
    ),
  })
);



app.use(bodyParser.json());
app.use(helmet());

// Routes
const router = require("./routers/router.js");
app.use("/", router);
// test liara haha

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
    console.log("Database synchronization failed:", error);
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
