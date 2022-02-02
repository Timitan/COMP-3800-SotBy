const express = require("express");
const app = express(); 
const path = require("path");
const http = require('http');
const socket = require("socket.io");
const { createAdapter } = require("@socket.io/postgres-adapter");
const { Pool } = require("pg");

console.log("Script started");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "password123",
  database: "sotby-test"
})



const port = 8000;

var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)}`
  )
);

const io = socket(server);
io.adapter(createAdapter(pool));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('itemChanged', (item) => {
    // Broadcast to everyone except sender
    socket.broadcast.emit('itemChanged', item);
  });
});
