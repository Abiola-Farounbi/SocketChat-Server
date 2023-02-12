"use strict";

const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const websocketServer = new WebSocket.Server({ server });

//when a websocket connection is established
websocketServer.on("connection", (socket) => {
  console.log("Client connected");

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    socket.send(`${message}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });


});

//start the web server
server.listen(3000, () => {
  console.log("Websocket server started on port 3000");
});