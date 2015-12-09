var express = require('express');
var http = require('http');
var db = require('./db');

// Middleware
var bodyParser = require('body-parser');
var morgan = require('morgan');

// Router
// var router = require('./routes.js');

var app = express();

// Set what we are listening on
var port = process.env.PORT || 8000;

var server = http.createServer(app);

console.log("Listening on port: " + port);
server.listen(port);

var userRouter = express.Router();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up routes
app.use('/users', userRouter);

require('./users/userRoutes.js')(userRouter);
