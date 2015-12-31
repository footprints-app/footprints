/**
 * A module that contains all functions to handle tour requests
 * @module tours/tourController
 * @requires tourModel
 */
var tours = require('./tourModel');
var Promise = require('bluebird');
var Query = Promise.promisifyAll(tours);
var images = require('../images/imageController');
var audio = require('../audio/audioController');
var jwt = require('jwt-simple');

module.exports = {
	/** Receives a tourId from request and calls promisified querySpecificTour from the tourModel.
	 * Retrieves a single tour from the database.
	 * @method getOneTour
	 * @param {object} req - Request object with an id representing tourId
	 * @param {object} res - Response object with a single tour
	 */
	getOneTour: function(req, res) {
		var tourId = req.params.id;

		Query.querySpecificTourAsync({tourId: tourId})
				.then(function(tour) {
					return Query.queryPlacesAsync(tour[0].id).then(function(places) {
						return [tour[0], places];
					})
				})
				.spread(function(tour, places) {
					tour['places'] = places;
					res.status(200).json(tour);
				})
				.catch(function(err) {
					res.status(404).json({error: err})
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
				res.status(200).json(data);
			})
			.catch(function(err) {
				res.status(404).json({error: err})
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
    var userId = jwt.decode(req.headers['x-access-token'], 'secret');
		Query.querySpecificTourAsync({userId: userId})
			.then(function(tours) {
				return Promise.each(tours, function(tour) {
					return Query.queryPlacesAsync(tour.id).then(function(places) {
							tour['places'] = places;
						});
				});
			})
			.then(function(data) {
				res.status(200).json(data)
			})
			.catch(function(err) {
				console.log('error: ', err);
				res.status(404).json({error: err})
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
    var userId = jwt.decode(req.headers['x-access-token'], 'secret');
		var tourParams = [req.body.tourName, userId, req.body.description, req.body.category, req.body.duration];
		var cityParams = [req.body.cityName, req.body.state, req.body.country];

		tours.addOrGetCity(cityParams, function(err, results) {
			if(err) {
				console.log('city db error');
				res.status(404).json({error: err});
			} else {
				tourParams.push(results);//Get city id from results
				tours.insertTour(tourParams, function(err, results) {
					if(err) {
						console.log('error adding tour to db');
						res.status(404).json({error: err});
					} else {
						res.status(201).json({id: results});//id refers to the tourId
					}
				});
			}
		});
	},
	/** Receives updated tour information from client and updates the tour in the database
	 * Gets cityId from addOrGetCity method
	 * Updates tour in database through updateTour method
	 *
	 * @method updateTour
	 * @param req {object} Request object that includes updated tour data
	 * @param res {object} Response status
	 */
	updateTour: function(req, res) {
    var userId = jwt.decode(req.headers['x-access-token'], 'secret');
		var tourParams = [req.body.tourName, userId, req.body.description, req.body.category, req.body.duration];
		var cityParams = [req.body.cityName, req.body.state, req.body.country];

		tours.addOrGetCity(cityParams, function(err, results) {
			if(err) {
				res.status(404).json({error: err});
			} else {
				tourParams.push(results);//Get city id from results
				tourParams.push(Number(req.params.id)); //add tourId as last parameter
				tours.updateTour(tourParams, function(err, results) {
					if(err) {
						res.status(404).json({error: err});
					} else {
						res.status(201).json(results);
					}
				});
			}
		});
	},

	/** Receives tourId of tour to be deleted from client and deletes the tour in the database
	 * Deletes tour in database through deleteTour method
	 *
	 * @method deleteTour
	 * @param req {object} includes params property which is the tourId
	 * @param res {object} Response status
	 */
	deleteTour: function(req, res) {
		var tourId = req.params.id;
		tours.deleteTour(tourId, function (err, results) {
			if(err) {
				res.status(404).json({error: err});
			} else {
				res.status(201).json(results);
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
				res.status(404).json({error: err});
			} else {
         res.status(201).json({id: results})
			}
		});
	},
	/** Receives updated tourId and placeOrder of new or updated place and increments the place order of all places in the tour that are equal or greater place orders
	 * Updates place in database through updatePlace method
	 *
	 * @method updatePlaceOrders
	 * @param req {object} Request object that includes tourId of updated/new place its placeOrder
	 * @param res {object} Response status
	 */
	updatePlaceOrders: function(req, res) {
		var params = [req.params.id, req.body.placeOrder, req.body.placeId];
		if(req.body.origPlaceOrder) {
			console.log('origPlaceOrder: ', req.body.origPlaceOrder);
			params.push(req.body.origPlaceOrder);

			tours.updatePlaceOrdersAfterEdit(params, function(err, results) {
				if(err) {
					console.log('error in updatePlaceOrders: ', err);
					res.status(404).json({error: err});
				} else {
					res.status(201).json(results);
				}
			});
		} else {
			tours.updatePlaceOrders(params, function(err, results) {
				if(err) {
					console.log('error in updatePlaceOrders: ', err);
					res.status(404).json({error: err});
				} else {
					res.status(201).json(results);
				}
			});
		}
	},

	/** Receives updated place information from client and updates the place in the database
	 * Updates place in database through updatePlace method
	 *
	 * @method updatePlace
	 * @param req {object} Request object that includes updated place data
	 * @param res {object} Response status
	 */
	updatePlace: function(req, res) {
		var params = [req.body.placeName, req.body.address, req.body.description, req.body.placeOrder, req.body.tourId, req.params.id];
		tours.updatePlace(params, function(err, results) {
			if(err) {
				res.status(404).json({error: err});
			} else {
				res.status(201).json(results);
			}
		});
	},
	/** Receives placeId of place to be deleted from client and deletes the place in the database
	 * Deletes place in database through deletePlace method
	 *
	 * @method deletePlace
	 * @param req {object} includes params property which is the placeId
	 * @param res {object} Response status
	 */
	deletePlace: function(req, res) {
		var placeId = req.params.id;
		tours.deletePlace(placeId, function (err, results) {
			if(err) {
				res.status(404).json({error: err});
			} else {
				res.status(201).json(results);
			}
		});
	},

	/** Receives tourId and utf-8 encoded image data to be added to the database
	 * Convers image to base64 and sends to cloudinary to host image, receives image url as response and stores in DB
	 *
	 * @method addTourPhoto
	 * @param req {object} includes params property which is the tourId, body is utf-8 encoded image data
	 * @param res {object} Response status
	 */
	addTourPhoto: function(req, res) {
		console.log('addTourPhoto called');
		var tourId = JSON.parse(req.params.id);
		var base64Image = req.body.encodedData;
		// var base64Image = new Buffer(req.body.encodedData, 'utf8').toString('base64');

		images.upload(base64Image, function(imageUrl) {
			if(!imageUrl) {
				console.log('error uploading image');
			} else {
				var params = [imageUrl, tourId];
				tours.addImageToTour(params, function (err, results) {
					if(err) {
						res.status(404).json({error: err});
					} else {
						res.status(201).json(imageUrl);
					}
				});
			}
		});
	},

	addPlacePhoto: function(req, res) {
		var placeId = JSON.parse(req.params.id);
		var base64Image = req.body.encodedData;
		console.log('INSIDE ADD PLACE PHOTO!')
		images.upload(base64Image, function(imageUrl) {
			if(!imageUrl) {
				console.log('error uploading image');
			} else {
				var params = [imageUrl, placeId];
				tours.addImageToPlace(params, function (err, results) {
					if(err) {
						res.status(404).json({error: err});
					} else {
						res.status(201).json(imageUrl);
					}
				});
			}
		});
	},

	getSignedS3Url: function(req, res) {
		audio.signedUrl(req, res);
	}
}
