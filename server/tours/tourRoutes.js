/**
 * A module that routes to a controller according to the url
 * @module tours/tourRoutes
 * @param app - the tourRouter (express.Router()) invoked by the server
 */
var tourController = require('./tourController.js');
var userController = require('../users/userController.js');

module.exports = function (app) {
	// app.get('/alltours', tourController.getAllTours);
	// app.get('/mytours/:id', tourController.getUserTours);
	// app.get('/:id', tourController.getOneTour);
 //  app.put('/edit/:id', tourController.updateTour);
 //  app.put('/editplace/:id', tourController.updatePlace);

  // app.delete('/delete/:id', tourController.deleteTour);
  // app.delete('/deleteplace/:id', tourController.deletePlace);
  
  app.get('/alltours', userController.checkAuth, tourController.getAllTours);
  app.get('/mytours/:id', userController.checkAuth, tourController.getUserTours);
  app.get('/:id', userController.checkAuth, tourController.getOneTour);

  app.post('/createtour', userController.checkAuth, tourController.createTour);
  app.post('/addplace', userController.checkAuth, tourController.addPlace);
   app.post('/tourphoto/:id', tourController.addTourPhoto);
  // app.post('/placephoto/:id', tourController.addPlacePhoto);
  // app.post('/audio/:id', tourController.addAudioToPlace);

  app.put('/edit/:id', userController.checkAuth, tourController.updateTour);
  app.put('/editplace/:id', userController.checkAuth, tourController.updatePlace);

  app.delete('/delete/:id', userController.checkAuth, tourController.deleteTour);
  app.delete('/deleteplace/:id', userController.checkAuth, tourController.deletePlace);
};
