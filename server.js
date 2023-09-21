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
app.use(cors({origin: new RegExp("https?\:\/\/([a-zA-Z0-9]+([-,_][a-zA-Z0-9]+)*\.)?(dummy\.monster")}));
app.use(bodyParser.json());
app.use(helmet());

// Routes
const router = require("./routers/router.js");
app.use("/", router);

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
