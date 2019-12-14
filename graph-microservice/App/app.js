var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Graph = require('./model/graph.js');
const cors = require('cors');
let edges = require('./model/graphDatabase.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let indexRouter = require('./routes/index');

var app = express();
app.use(cors());

//INICJALIZACJA GLOBALNEJ ZMIENNEJ - GRAPH - TO JEST DO ZMIANY I DO WCZYTANIA Z BAZY

global.g = new Graph();
// let testujemy = edges.findAll().then(
//     result => console.log(result[0].dataValues)
// );
// console.log(testujemy);

g.add('a', 'b', 10);
g.add('b', 'c', 5);
g.add('c', 'd', 4);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const edge = {
  start: "f",
  end: "g",
  weight: 23
};

edges.create(edge);

module.exports = app;
