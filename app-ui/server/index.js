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
  database: "sotby"
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

// Routes
app.get('/users', (req, res) => {
  instructor_model.getUsers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

app.post('/users', (req, res) => {
  instructor_model.postUser(req.body)
  .then(response => {
    console.log("Response: " + response);
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { start, end } = req.body;
  //console.log("Id: " + id + "\nStart and Ends: " + start + " | " + end);
  instructor_model.updateCourse(id, start, end)
  .then(response => {
    console.log("Response: " + JSON.stringify(response));
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

// app.delete('/users/:id', (req, res) => {
//   const id = req.params.id;
//   //console.log("Id: " + id + "\nStart and Ends: " + start + " | " + end);
//   instructor_model.deleteUser(id)
//   .then(response => {
//     console.log("Response: " + JSON.stringify(response));
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     console.log(error);
//     res.status(500).send(error);
//   })
// })

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
  socket.on('itemChanged', (item, itemInfo) => {
    // Broadcast to everyone except sender
    //console.log(item);
    socket.broadcast.emit('itemChanged', item);

    // Update posgresql database with the changed item
    console.log(itemInfo);
    instructor_model.putCourse(itemInfo.id, itemInfo.start, itemInfo.end)
    .then(response => {
      console.log("Update Success");
      //console.log("Response: " + JSON.stringify(response));
    })
    .catch(error => {
      console.log(error);
    })
  });

  socket.on('userAdded', (user) => {
    // Broadcast to everyone except sender
    //console.log(item);
    socket.broadcast.emit('userAdded', user);

    // Update posgresql database
    console.log(user);
    instructor_model.postUser(user)
    .then(response => {
      console.log("Add Success");
      //console.log("Response: " + JSON.stringify(response));
    })
    .catch(error => {
      console.log(error);
    })
  });

  socket.on('userDeleted', (key) => {
    // Broadcast to everyone except sender
    //console.log(item);
    socket.broadcast.emit('userDeleted', key);

    // Update posgresql database
    console.log(key);
    instructor_model.deleteUser(key)
    .then(response => {
      console.log("Add Success");
      //console.log("Response: " + JSON.stringify(response));
    })
    .catch(error => {
      console.log(error);
    })
  });
});
