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

const instructor_model = require('./requests')

const port = 8000;

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/instructors', (req, res) => {
  instructor_model.getInstructors()
  .then(response => {
    console.log("Response: " + response);
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)}`
  )
);

// Socket.io code
const io = socket(server);
io.adapter(createAdapter(pool));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('itemChanged', (item) => {
    // Broadcast to everyone except sender
    socket.broadcast.emit('itemChanged', item);
  });
});
