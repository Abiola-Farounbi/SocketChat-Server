"use strict";



const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const websocketServer = new WebSocket.Server({ server });

//start the web server
server.listen(3000, () => {
  console.log("Websocket server started on port 3000");
});


// when a websocket connection is established
// Event handler for when a client connects to the server
websocketServer.on('connection', (socket) => {
  console.log('client connected.');


  // Event handler for when a message is received from the client
  socket.on('message', (data) => {
    // Broadcast the message to all connected clients
    websocketServer.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
        console.log("message",data.toString())
      }
    });
  });

  // Event handler for when a client disconnects from the server
  socket.on('close', () => {
    console.log('Client disconnected');
  });

});


