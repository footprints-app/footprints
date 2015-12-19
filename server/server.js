var express = require('express');
var http = require('http');
var db = require('./db');

// Middleware
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

// Set what we are listening on
var port = process.env.PORT || 8000;

var server = http.createServer(app);

console.log("Listening on port: " + port);
server.listen(port);

var userRouter = express.Router();
var tourRouter = express.Router();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

// Set up routes
app.use('/users', userRouter);
app.use('/tours', tourRouter);

require('./users/userRoutes.js')(userRouter);
require('./tours/tourRoutes.js')(tourRouter);
