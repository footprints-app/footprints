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
	 * If it exists, the city's data is given to the callback.
	 * If it doesn't exist, the city is added to the table and the data is given to the callback.
	 *
   * @param {string} params - an array containing the cityName, state, and country
   * @param {function} callback - a callback which will take the arguments err and results from the database query
   */
	addOrGetCity: function(params, callback) {
		var selectQuery = "SELECT id from cities WHERE cityName = ? AND state = ? AND country = ?"
		//(" + params[0] + ") \
		  //                 AND state = (" + params[1] + ") AND country = (" + params[2] + ")";
		var insertQuery = "INSERT into cities(cityName, state, country) \
                       value (?, ?, ?)";
		db.query(selectQuery, params, function(err, results) {
			if(err) {
				console.log("did not get past city query");
				callback(err);
			} else {
				if(results.length !== 0) {
					console.log("results from city query: ", results);
					callback(err, results[0].id);
				} else {
					db.query(insertQuery, params, function(err, results) {
						if(err) {
							console.log("could not insert into cities");
							callback(err);
						} else {
							db.query(selectQuery, params, function(err, results) {
								if(err) {
									callback(err);
								} else {
									console.log("insert into cities successful: ", results[0].id)
									callback(err, results[0].id);									
								}
							})
						}
					})
				}
			}
		})
	},

	insertTour: function(params, callback) {
		var queryStr = "INSERT into tours(tourName, userId, description, category, duration, cityId) \
			              value (?, ?, ?, ?, ?, ?)";
		db.query(queryStr, params, function(err, results) {
			if(err) {
				callback(err);
			} else {
				callback(err, results[0]);
			}
		})
	}
};
