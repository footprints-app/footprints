var express = require('express');
var http = require('http');
var db = require('./db');

// Middleware
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();

// Set what we are listening on
var port = 8000 || process.env.PORT;

var server = http.createServer(app);

console.log("Listening on port: " + port);
server.listen(port);

// Parsing
app.use(parser.json());

// Set up routes
app.use("/", router);
