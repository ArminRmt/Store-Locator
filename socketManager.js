const socketIO = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173", "https://storelocatorapp.dummy.monster"],
    methods: ["GET", "POST", "PATH", "DELETE"],
  },
});

const sellerSockets = {}; // Mapping of seller IDs to socket IDs
const userSockets = {}; // Mapping of user IDs to socket IDs
const messageQueue = {}; // Message queue for offline notifications

io.on("connection", (socket) => {
  console.log("Client Enterd with id: ", socket.id);

  // Handle seller identification
  socket.on("identifySeller", (sellerId) => {
    sellerSockets[sellerId] = socket.id;
    console.log(`Seller ${sellerId} identified with socket ${socket.id}`);

    // Check if there are any pending messages for this seller and send them
    if (messageQueue[sellerId]) {
      messageQueue[sellerId].forEach((message) => {
        socket.emit("newRequest", message);
        // io.to(socket.id).emit("newRequest", newRequest);
      });
      // Clear the queue after sending messages
      messageQueue[sellerId] = [];
    }
  });

  // Handle response from seller to user
  socket.on("identifyBuyer", (userId) => {
    userSockets[userId] = socket.id;
    console.log(`Buyer ${userId} identified with socket ${socket.id}`);
  });

  socket.on("DisconnectSeller", () => {
    // Clean up the mapping when a seller disconnects
    const disconnectedSeller = Object.keys(sellerSockets).find(
      (key) => sellerSockets[key] === socket.id
    );
    if (disconnectedSeller) {
      delete sellerSockets[disconnectedSeller];
      console.log(`Seller ${disconnectedSeller} disconnected`);
    }
  });

  socket.on("DisconnectBuyer", () => {
    // Clean up the mapping when a seller disconnects
    const disconnectedBuyer = Object.keys(userSockets).find(
      (key) => userSockets[key] === socket.id
    );
    if (disconnectedBuyer) {
      delete userSockets[disconnectedBuyer];
      console.log(`Buyer ${disconnectedBuyer} disconnected`);
    }
  });
});

// add messages to the message queue
function addToMessageQueue(sellerId, message) {
  if (!messageQueue[sellerId]) {
    messageQueue[sellerId] = [];
  }
  messageQueue[sellerId].push(message);
}

module.exports = {
  io,
  sellerSockets,
  userSockets,
  addToMessageQueue,
  app,
  server,
};
