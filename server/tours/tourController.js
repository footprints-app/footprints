/**
 * A module that contains all functions to handle tour requests
 * @module tours/tourController
 * @requires tourModel
 */
var tours = require('./tourModel');
var Promise = require('bluebird');
var Query = Promise.promisifyAll(tours);

module.exports = {
	/** Receives a tourId from request and calls promisified querySpecificTour from the tourModel.
	 * Retrieves a single tour from the database.
	 * @method getOneTour
	 * @param {object} req - Request object with an id representing tourId
	 * @param {object} res - Response object with a single tour
	 */
	getOneTour: function(req, res) {
		var tourId = JSON.parse(req.params.id);

		Query.querySpecificTourAsync({tourId: tourId})
				.then(function(tour) {
					res.status(200).send(tour[0]);
				})
				.catch(function(err) {
					res.status(404).send({error: err})
				});
	},

	/** Calls promisified queryTours from tourModel to retrieve tour information
	 * then calls queryPlaces to find all places that belong to each tour.
	 * @method getAllTours
	 * @param {object} req Request object
	 * @param {object} res Response object with all tours from database
	 */
	getAllTours: function(req, res) {
		Query.queryToursAsync()
			.then(function(tours) {
				return Promise.each(tours, function(tour) {
					return Query.queryPlacesAsync(tour.id).then(function(places) {
						tour['places'] = places;
					});
				});
			})
			.then(function(data) {
				res.status(200).send(data);
			})
			.catch(function(err) {
				res.status(404).send({error: err})
			});
	},
	/** Receives a userId from request and calls promisified querySpecificTours from tourModel to retrieve user's tours information
	 * then calls queryPlaces to find all places that belong to each tour.
	 * Retrieves user specific tours from the database
	 * @method getUserTours
	 * @param req {object} Request object that identifies the user
	 * @param res {object} Response object with tours that match user
	 */
	getUserTours: function(req, res) {
		var userId = JSON.parse(req.params.id);

		Query.querySpecificTourAsync({userId: userId})
			.then(function(tours) {
				return Promise.each(tours, function(tour) {
					return Query.queryPlacesAsync(tour.id).then(function(places) {
							tour['places'] = places;
						});
				});
			})
			.then(function(data) {
				res.status(200).send(data)
			})
			.catch(function(err) {
				res.status(404).send({error: err})
			});
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

		tours.addOrGetCity(cityParams, function(err, results) {
			if(err) {
				res.status(404).send({error: err});
			} else {
				tourParams.push(results);//Get city id from results
				tours.insertTour(tourParams, function(err, results) {
					if(err) {
						res.status(404).send({error: err});
					} else {
						res.status(201).json({id: results});//id refers to the tourId
					}
				});
			}
		});
	},
	/** Receives new place information from client and posts place to database
	 * Inserts new place to database through insertPlace method
	 *
	 * @method addPlace
	 * @param req {object} Request object that includes new place data
	 * @param res {object} Response status
	 */
	addPlace: function(req, res) {
		var params = [req.body.placeName, req.body.address, req.body.description, req.body.placeOrder, req.body.tourId];

		tours.insertPlace(params, function(err, results) {
			if(err) {
				res.status(404).send({error: err});
			} else {
         res.status(201).json({id: results})
			}
		});
	}
}
