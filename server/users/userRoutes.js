/**
 * A module that routes to a controller according to the url
 * @module users/userRoutes
 * @param app - the userRouter (express.Router()) invoked by the server
 */
var userController = require('./userController.js');

module.exports = function (app) {
  app.post('/signup', userController.signup);
  app.post('/login', userController.login);
};
