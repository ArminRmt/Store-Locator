const socketIO = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const sellerSockets = {}; // Mapping of seller IDs to socket IDs
const userSockets = {}; // Mapping of user IDs to socket IDs

io.on("connection", (socket) => {
  console.log("Client Enterd with id: ", socket.id);

  // Handle seller identification
  socket.on("identifySeller", (sellerId) => {
    sellerSockets[sellerId] = socket.id;
    console.log(`Seller ${sellerId} identified with socket ${socket.id}`);
  });

  // Handle response from seller to user
  socket.on("identifyBuyer", (userId) => {
    userSockets[userId] = socket.id;
    console.log(`Buyer ${userId} identified with socket ${socket.id}`);
  });

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

module.exports = { io, sellerSockets, userSockets, app, server };
