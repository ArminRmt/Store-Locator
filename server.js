const express = require("express");
const db = require("./config/db.config.js");
const cors = require("cors");
let router = require("./routers/router.js");
var bodyParser = require("body-parser");
const env = require("./config/env.js");
const { initial } = require("./factory.js");
const { swaggerUi, specs } = require("./config/swaggerConfig.js");
const socketIO = require("socket.io");
const http = require("http");

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync with { force: true }");
  initial();
});

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173", // Allow the frontend to connect
    methods: ["GET", "POST"],
  },
});

const sellerSockets = {}; // Mapping of seller IDs to socket IDs

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Handle seller identification
  socket.on("identifySeller", (sellerId) => {
    sellerSockets[sellerId] = socket.id;
    console.log(`Seller ${sellerId} identified with socket ${socket.id}`);
  });

  // ... Other socket event handling ...

  socket.on("disconnect", () => {
    // Clean up the mapping when a seller disconnects
    const disconnectedSeller = Object.keys(sellerSockets).find(
      (key) => sellerSockets[key] === socket.id
    );
    if (disconnectedSeller) {
      delete sellerSockets[disconnectedSeller];
      console.log(`Seller ${disconnectedSeller} disconnected`);
    }
  });
});

// module.exports = {
//   io,
//   sellerSockets, // Export the sellerSockets object
// };

// module.exports = { io };
// Attach Socket.IO middleware to your Express app
app.use((req, res, next) => {
  req.io = io; // Attach the io object to the request object for use in your routes
  req.sellerSockets = sellerSockets;
  next();
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/", router);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// app.listen(env.port, function () {
server.listen(env.port, function () {
  console.log(`App listening on port ${env.port}`);
});
