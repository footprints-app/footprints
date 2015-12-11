/**
 * A module that contains all functions to handle tour requests
 * @module tours/tourController
 * @requires tourModel
 */
var tours = require('./tourModel');

module.exports = {
	getOneTour: function(req, res) {

	},

	/** Retrieves all tours from database
	 * @method getAllTours
	 * @param {object} req Request object
	 * @param {object} res Response object with all tours from database
	 */
	getAllTours: function(req, res) {

	},
	/** Retrieves user specific tours from the database
	 * @method getUserTours
	 * @param req {object} Request object that identifies the user
	 * @param res {object} Response object with tours that match user
	 */
	getUserTours: function(req, res) {

	},
	/** Receives new tour information from client and posts tour to database
	 * Gets cityId from addOrGetCity method
	 * Inserts new tour to database through insertTour method
	 *
	 * @method createTour
	 * @param req {object} Request object that includes new tour data
	 * @param res {object} Response status
	 */
	createTour: function(req, res) {
		var tourParams = [req.body.tourName, req.body.userId, req.body.description, req.body.category, req.body.duration];
		var cityParams = [req.body.cityName, req.body.state, req.body.country];

		console.log(cityParams);
		tours.addOrGetCity(cityParams, function(err, results) {
			if(err) {
				res.status(404).send({error: err});
			} else {
				tourParams.push(results);//Get city id from results
				tours.insertTour(tourParams, function(err, results) {
					if(err) {
						res.status(404).send({error: err});
					} else {
						res.status(201).json({tourId: results});
					}
				})
			}
		})
	},

	addPlace: function(req, res) {

	}
}
