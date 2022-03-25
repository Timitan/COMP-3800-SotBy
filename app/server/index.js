const express = require("express");
const app = express(); 
const path = require("path");
const http = require('http');
const socket = require("socket.io");
const { createAdapter } = require("@socket.io/postgres-adapter");
const { Pool } = require("pg");
const socketConnect = require("./socket");
const instructorModel = require('./requests')

console.log("Script started");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "password123",
  database: "sotby"
})

const port = 8000;

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

// Routes
app.get('/users', (req, res) => {
  instructorModel.getUsers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

app.post('/users', (req, res) => {
  instructorModel.postUser(req.body)
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
  instructorModel.updateCourse(id, start, end)
  .then(response => {
    console.log("Response: " + JSON.stringify(response));
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

// Vacations
app.get('/vacations', (req, res) => {
  instructorModel.getVacationsApproved(req)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

app.get('/vacationsNotApproved', (req, res) => {
  instructorModel.getAllVacationsNotApproved(req)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

app.post('/vacations', (req, res) => {
  instructorModel.postUser(req.body)
  .then(response => {
    console.log("Response: " + response);
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
//   instructorModel.deleteUser(id)
//   .then(response => {
//     console.log("Response: " + JSON.stringify(response));
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     console.log(error);
//     res.status(500).send(error);
//   })
// })

app.put

var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)}`
  )
);

socketConnect.socketStart(server, pool, instructorModel);