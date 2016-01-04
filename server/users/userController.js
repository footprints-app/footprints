/**
 * A module that contains all functions to handle user requests
 * Accesses functions from userModel
 * @module users/userController
 */
var users = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var db = require('../db');

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
            users.getUserInfo(params[0], function(err, user) {
              if(err) {
                res.status(404).json({error: err});
              } else {
                  if (user) {
                    var token = jwt.encode(user.id, 'secret');
                    res.status(200).json({token: token, userId: user.id});
                  } 
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
    
    users.comparePassword(params, function(err, user) {
      if(err) {
        console.error(err);
        res.status(400).json({error: err});
        next(err);
      } else {
        var token = jwt.encode(user.id, 'secret');
        res.status(200).json({token: token, userId: user.id});
      }
    });
  },

  /**
   * Checks from token in request header and uses jwt to decode the token to get the userId
   * Uses userId decoded from token to check that user exists in the database. If the user exists, invoke next function.
   * If there is no match, send a 401 status
   *
   * @param {object} req - Request from the client
   * @param {object} res - Response to be sent to the client
   * @param {object} next - Function to be invoked next with the same request and response parameters
   */
  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token) {
      res.sendStatus(401);
    } else {
        var user = jwt.decode(token, 'secret');
        var queryStr = "select * from users where id = ?";

        db.query(queryStr, user, function(err, userInfo) {
          if(userInfo.length !== 0) {
            next();
          } else {
            console.log('user is not in DB');
            res.sendStatus(401);
          }
        });
      }
  }

};

