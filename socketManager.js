const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: [
      process.env.LOCAL_ALLOWED_ORIGIN,
      process.env.PRODUCTION_ALLOWED_ORIGIN,
      process.env.ANDROID_ALLOWED_ORIGIN
    ],
    // origin:
    //   process.env.DEBUG === "true"
    //     ? process.env.LOCAL_ALLOWED_ORIGIN
    //     : process.env.PRODUCTION_ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PATH", "DELETE"],
  },
});


const sellerSockets = {};
const userSockets = {};
const RequestQueue = {};
const UpdatedRequestQueue = {};
const DeletedRequestQueue = {};
const ResponseQueue = {};
const UpdatedResponseQueue = {};
const DeletedResponseQueue = {};

io.on("connection", (socket) => {
  console.log("Client Enterd with id: ", socket.id);

  // Handle seller identification
  socket.on("identifySeller", (sellerId) => {
    sellerSockets[sellerId] = socket.id;
    console.log(`Seller ${sellerId} identified with socket ${socket.id}`);

    try {
      // if new request has been made and seller where offline
      sendQueuedMessages(socket, sellerId, RequestQueue, "newRequest");
      sendQueuedMessages(
        socket,
        sellerId,
        UpdatedRequestQueue,
        "requestUpdated"
      );
      sendQueuedMessages(
        socket,
        sellerId,
        DeletedRequestQueue,
        "requestDeleted"
      );
    } catch (error) {
      console.error(`Error in identifySeller: ${error}`);
    }
  });

  // Handle response from seller to user
  socket.on("identifyBuyer", (userId) => {
    userSockets[userId] = socket.id;
    console.log(`Buyer ${userId} identified with socket ${socket.id}`);

    try {
      // if new response made and user where offline
      sendQueuedMessages(socket, userId, ResponseQueue, "newResponse");
      sendQueuedMessages(
        socket,
        userId,
        UpdatedResponseQueue,
        "responseUpdated"
      );
      sendQueuedMessages(
        socket,
        userId,
        DeletedResponseQueue,
        "responseDeleted"
      );
    } catch (error) {
      console.error(`Error in identifyBuyer: ${error}`);
    }
  });

  socket.on("DisconnectSeller", () => {
    try {
      // Clean up the mapping when a seller disconnects
      const disconnectedSeller = Object.keys(sellerSockets).find(
        (key) => sellerSockets[key] === socket.id
      );
      if (disconnectedSeller) {
        delete sellerSockets[disconnectedSeller];
        console.log(`Seller ${disconnectedSeller} disconnected`);
      }
    } catch (error) {
      console.error(`Error in DisconnectSeller: ${error}`);
    }
  });

  socket.on("DisconnectBuyer", () => {
    try {
      // Clean up the mapping when a seller disconnects
      const disconnectedBuyer = Object.keys(userSockets).find(
        (key) => userSockets[key] === socket.id
      );
      if (disconnectedBuyer) {
        delete userSockets[disconnectedBuyer];
        console.log(`Buyer ${disconnectedBuyer} disconnected`);
      }
    } catch (error) {
      console.error(`Error in DisconnectBuyer: ${error}`);
    }
  });
});

function sendQueuedMessages(socket, recipientId, queue, eventName) {
  const messages = queue[recipientId];
  if (messages) {
    messages.forEach((message) => {
      socket.emit(eventName, message);
    });
    delete queue[recipientId];
  }
}

function addToQueue(queue, userId, message) {
  if (!queue[userId]) {
    queue[userId] = [];
  }
  queue[userId].push(message);
}

module.exports = {
  io,
  sellerSockets,
  userSockets,
  RequestQueue,
  UpdatedRequestQueue,
  DeletedRequestQueue,
  ResponseQueue,
  UpdatedResponseQueue,
  DeletedResponseQueue,
  addToQueue,
  server,
  app,
};
