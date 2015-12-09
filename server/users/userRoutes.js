var userController = require('./userController.js');

/** @userRoutes */
module.exports = function (app) {
  /**
   * userRoutes function
   * routes to controller according to url
   * @param app - the userRouter (express.Router()) from the server
   */
  app.post('/signup', userController.signup);
};
