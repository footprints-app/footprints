var mysql = require('mysql');

var connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "thesis"
});

//var connection = mysql.createConnection({
//  host     : 'mysqldb.chfd65rjuftn.us-west-1.rds.amazonaws.com',
//  user     : 'dbmaster',
//  password : 'administrator',
//  port     : '3306'
//});

connection.connect();

module.exports = connection;
