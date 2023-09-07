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
const RequestQueue = {};
const UpdatedRequestQueue = {};
const DeletedRequestQueue = {};
const ResponseQueue = {};
const UpdatedResponseQueue = {};
const DeletedResponseQueue = {};

// Memory optimization: Cleanup empty queues
// function cleanupEmptyQueues() {
//   for (const sellerId in RequestQueue) {
//     if (
//       RequestQueue.hasOwnProperty(sellerId) &&
//       RequestQueue[sellerId].length === 0
//     ) {
//       delete RequestQueue[sellerId];
//     }
//   }
//   // Repeat the process for other queues (UpdatedRequestQueue, DeletedRequestQueue, ResponseQueue, etc.)
//   setTimeout(cleanupEmptyQueues, cleanupInterval); // Repeat the cleanup after a certain interval
// }

// // Define the cleanup interval (adjust as needed)
// const cleanupInterval = 30 * 60 * 1000; // Cleanup every 30 minutes

// // Start the cleanup process
// cleanupEmptyQueues();

io.on("connection", (socket) => {
  console.log("Client Enterd with id: ", socket.id);

  // Handle seller identification
  socket.on("identifySeller", (sellerId) => {
    sellerSockets[sellerId] = socket.id;
    console.log(`Seller ${sellerId} identified with socket ${socket.id}`);

    try {
      // if new request has been made and seller where offline
      if (RequestQueue[sellerId]) {
        RequestQueue[sellerId].forEach((message) => {
          socket.emit("newRequest", message);
        });
        RequestQueue[sellerId] = [];
      }

      if (UpdatedRequestQueue[sellerId]) {
        UpdatedRequestQueue[sellerId].forEach((message) => {
          socket.emit("requestUpdated", message);
        });
        UpdatedRequestQueue[sellerId] = [];
      }

      if (DeletedRequestQueue[sellerId]) {
        DeletedRequestQueue[sellerId].forEach((message) => {
          socket.emit("requestDeleted", message);
        });
        DeletedRequestQueue[sellerId] = [];
      }
    } catch (error) {
      console.error(`Error in identifySeller: ${error.message}`);
    }
  });

  // Handle response from seller to user
  socket.on("identifyBuyer", (userId) => {
    userSockets[userId] = socket.id;
    console.log(`Buyer ${userId} identified with socket ${socket.id}`);

    try {
      // if new response made and user where offline
      if (ResponseQueue[userId]) {
        ResponseQueue[userId].forEach((message) => {
          socket.emit("newResponse", message);
        });
        ResponseQueue[userId] = [];
      }

      if (UpdatedResponseQueue[userId]) {
        UpdatedResponseQueue[userId].forEach((message) => {
          socket.emit("responseUpdated", message);
        });
        UpdatedResponseQueue[userId] = [];
      }

      if (DeletedResponseQueue[userId]) {
        DeletedResponseQueue[userId].forEach((message) => {
          socket.emit("responseDeleted", message);
        });
        DeletedResponseQueue[userId] = [];
      }
    } catch (error) {
      console.error(`Error in identifyBuyer: ${error.message}`);
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
      console.error(`Error in DisconnectSeller: ${error.message}`);
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
      console.error(`Error in DisconnectBuyer: ${error.message}`);
    }
  });
});

function addToRequestQueue(sellerId, message) {
  if (!RequestQueue[sellerId]) {
    RequestQueue[sellerId] = [];
  }
  RequestQueue[sellerId].push(message);
}

function addToUpdatedRequestQueue(sellerId, message) {
  if (!UpdatedRequestQueue[sellerId]) {
    UpdatedRequestQueue[sellerId] = [];
  }
  UpdatedRequestQueue[sellerId].push(message);
}

function addToDeletedRequestQueue(sellerId, message) {
  if (!DeletedRequestQueue[sellerId]) {
    DeletedRequestQueue[sellerId] = [];
  }
  DeletedRequestQueue[sellerId].push(message);
}

function addToResponseQueue(userID, message) {
  if (!ResponseQueue[userID]) {
    ResponseQueue[userID] = [];
  }
  ResponseQueue[userID].push(message);
}

function addToUpdatedResponseQueue(userID, message) {
  if (!UpdatedResponseQueue[userID]) {
    UpdatedResponseQueue[userID] = [];
  }
  UpdatedResponseQueue[userID].push(message);
}

function addToDeletedResponseQueue(userID, message) {
  if (!DeletedResponseQueue[userID]) {
    DeletedResponseQueue[userID] = [];
  }
  DeletedResponseQueue[userID].push(message);
}

module.exports = {
  io,
  sellerSockets,
  userSockets,
  addToRequestQueue,
  addToUpdatedRequestQueue,
  addToDeletedRequestQueue,
  addToResponseQueue,
  addToUpdatedResponseQueue,
  addToDeletedResponseQueue,
  app,
  server,
};
