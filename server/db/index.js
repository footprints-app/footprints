var mysql = require('mysql');

var connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "thesis"
});

connection.connect();

module.exports = connection;
