var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter from server
  app.post('/signup', userController.signup);
};
