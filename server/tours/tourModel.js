/**
 * A module that accesses the mysql database and responds to requests from the controller
 * @type {connection|exports|module.exports}
 * @requires db
 */
var db = require('../db');

module.exports = {
	/** Queries the database for tours
	 * TODO: query based on city
	 * @method queryTours
	 * @param {array} params
	 * @param {function} callback
	 */
	queryTours: function(params, callback) {
		var queryStr = "SELECT * from tours";
		db.query(queryStr, params, function(err, results) {
			if(err) {
				callback(err);
			} else {
				callback(err, results);
			}
		});
	},

	userTours: function(params, callback) {
		var queryStr = "SELECT * from tours WHERE userId = ?";
		db.query(queryStr, params, function(err, results) {
			if(err) {
				callback(err);
			} else {
				callback(err, results);
			}
		});
	}
};
