/**
 * A module that contains all functions to handle user requests
 * Accesses functions from userModel
 * @module users/userController
 */
var users = require('./userModel.js');

module.exports = {
  /**
   * Calls three functions from userModel.
   * Checks if user name is available.  If not, then will send error message.
   * If user name is avaiable, will call userModel signup function to post to database.
   * If post is successful, will retrieve user info.
   *
   * @param {object} req - Request from the client
   * @param {object} res - Response to be sent to the client
   */
  signup: function (req, res, next) {
    var params = [req.body.userName, req.body.firstName, req.body.lastName, req.body.password];
    users.checkNameAvailability(params[0], function(err, results) {
      if(err) {
        console.error(err);
        res.status(400).send(err);
      } else {
        users.signup(params, function(err, results) {
          if(err) {
            res.status(404).send(err);
          } else {
            users.getUserInfo(params[0], function(err, results) {
              if(err) {
                res.status(404).send(err);
              } else {
                res.status(201).json(results);
              }
            });
          }
        });
      }
    });
  },

  login: function (req, res) {
    var params = [req.body.userName, req.body.password];
    //Check to see if userName exists
    //Check to see if password matches
    //Return user information if both are true
    users.checkUserPassword(params, function(err, results) {
      if(err) {
        console.error(err);
        res.status(400).send({error: err});
      } else {
        res.status(200).json(results);
      }
    });
  }

};
