var mysql = require('mysql');

var connection = mysql.createConnection({
	host: process.env.RDS_HOSTNAME || 'localhost',
	user: process.env.RDS_USERNAME || "root",
  password: process.env.RDS_PASSWORD || "",
  database: process.env.database || "thesis",
	port: process.env.RDS_PORT || 3306
});

connection.connect(function(err) {
	if(err) {
		console.error('Connection Error:', err);
	} else {
		console.log('Database connected!')
	}
});

module.exports = connection;
