var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* Routers */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vacationsRouter = require('./routes/vacations');
var coursesRouter = require('./routes/courses');
var resourcesRouter = require('./routes/resources');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vacations', vacationsRouter);
app.use('/courses', coursesRouter);
app.use('/resources', resourcesRouter);

module.exports = app;
