const express = require("express");
const app = express(); // create express app
const path = require("path");
const http = require('http');
const socket = require("socket.io");

console.log("Script started");
const port = 8000;

var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)}`
  )
);

const io = socket(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('itemChanged', (item) => {
    // Broadcast to everyone except sender
    socket.broadcast.emit('itemChanged', item);
  });
});
