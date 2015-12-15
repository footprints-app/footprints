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
        res.status(400).json({error: err});
      } else {
        users.signup(params, function(err, results) {
          if(err) {
            res.status(404).json({error: err});
          } else {
            users.getUserInfo(params[0], function(err, results) {
              if(err) {
                res.status(404).json({error: err});
              } else {
                res.status(201).json(results);
              }
            });
          }
        });
      }
    });
  },
  /**
   * Calls comparePassword function from userModel.
   * Checks if user name exists.  If not, then will send error message.
   * Checks if password is correct.
   * If there is a match, will retrieve user info.
   *
   * @param {object} req - Request from the client
   * @param {object} res - Response to be sent to the client
   */
  login: function (req, res, next) {
    var params = [req.body.userName, req.body.password];
    users.comparePassword(params, function(err, results) {
      if(err) {
        console.error(err);
        res.status(400).json({error: err});
        next(err);
      } else {
        res.status(200).json(results);
      }
    });
  }
  //   users.checkUserPassword(params, function(err, results) {
  //     if(err) {
  //       console.error(err);
  //       res.status(400).json({error: err});
  //       next(err);
  //     } else {
  //       res.status(200).json(results);
  //     }
  //   });
  // }

};
