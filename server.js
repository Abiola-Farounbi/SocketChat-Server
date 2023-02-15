"use strict";

// Import required modules
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// Create an Express app instance
const app = express();

// Create an HTTP server using the Express app instance
const server = http.createServer(app);

// Create a WebSocket server instance and attach it to the HTTP server
const websocketServer = new WebSocket.Server({ server });

// Start the server listening on port 3000
server.listen(3000, () => {
  console.log("Websocket server started on port 3000");
});

// Listen for WebSocket connections
websocketServer.on('connection', (socket) => {

  // Log a message when a new client connects
  console.log('client connected.');

  // Listen for incoming WebSocket messages
  socket.on('message', (data) => {
   
   // Broadcast the message to all connected clients
    websocketServer.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
        // console.log("message",data.toString())
      }
    });
  });

  // Listen for WebSocket connection close events
  socket.on('close', () => {
    // Log a message when a client disconnects
    console.log('Client disconnected');
  });

});
