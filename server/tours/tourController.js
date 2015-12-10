/**
 * A module that contains all functions to handle tour requests
 * @module tours/tourController
 * @requires tourModel
 */
var tours = require('./tourModel');

module.exports = {
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
	 * @method createTour
	 * @param req {object} Request object that includes new tour data
	 * @param res {object} Response status
	 */
	createTour: function(req, res) {

	}
}
