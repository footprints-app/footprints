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
	},
  /**
   * Inserts or selects a city from the city table.
	 * Queries the cities table for a city. 
	 * If it exists, the city's id is given to the callback.
	 * If it doesn't exist, the city is added to the table and the city's id is given to the callback.
	 *
   * @param {string} params - an array containing the cityName, state, and country
   * @param {function} callback - a callback which will take the arguments err and results from the database query
   */
	addOrGetCity: function(params, callback) {
		var selectQuery = "SELECT id from cities WHERE cityName = ? AND state = ? AND country = ?"
		var insertQuery = "INSERT into cities(cityName, state, country) \
                       value (?, ?, ?)";
		db.query(selectQuery, params, function(err, results) {
			if(err) {
				callback(err);
			} else {
				if(results.length !== 0) {
					callback(err, results[0].id);
				} else {
					db.query(insertQuery, params, function(err, results) {
						if(err) {
							callback(err);
						} else {
							callback(err, results.insertId);
						}
					})
				}
			}
		})
	},

	insertTour: function(params, callback) {
		var insertStr = "INSERT into tours(tourName, userId, description, category, duration, cityId) \
			              value (?, ?, ?, ?, ?, ?)";
		db.query(insertStr, params, function(err, results) {
			if(err) {
				callback(err);
			} else {
				callback(err, results.insertId);
			}
		})
	}
};
