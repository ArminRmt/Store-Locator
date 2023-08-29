const db = require("./config/db.config.js");
const cors = require("cors");
let router = require("./routers/router.js");
var bodyParser = require("body-parser");
const env = require("./config/env.js");
const { initial } = require("./factory.js");
const { swaggerUi, specs } = require("./config/swaggerConfig.js");
const { app, server } = require("./socketManager");

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync with { force: true }");
  initial();
});

const corsOptions = {
  origin: ["http://localhost:5173", "https://storelocatorapp.dummy.monster"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/", router);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

server.listen(env.port, function () {
  console.log(`App listening on port ${env.port}`);
});
