/**
 * A module that routes to a controller according to the url
 * @module tours/tourRoutes
 * @param app - the tourRouter (express.Router()) invoked by the server
 */
var tourController = require('./tourController.js');

module.exports = function (app) {
	app.get('/alltours', tourController.getAllTours);
	app.get('/mytours', tourController.getUserTours);
	app.post('/createtour', tourController.createTour);
};
