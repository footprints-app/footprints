/**
 * A module that contains all functions to handle user requests
 * Accesses functions from userModel
 * @module users/userController
 */
var users = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

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
                    var token = jwt.encode(user.userName, 'secret');
                    // console.log('token......', token);
                    res.status(200).json({token: token, userInfo: user});
                  } 
                // res.status(201).json(results);
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
      console.log('result after login......', user)
      if(err) {
        console.error(err);
        res.status(400).json({error: err});
        next(err);
      } else {
          if (user) {
            var token = jwt.encode(user.userName, 'secret');
            // console.log('token......', token);
            res.status(200).json({token: token, userInfo: user});
          } else {
            console.error('No User', err);
          }
        // res.status(200).json(results);
      }
    });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    console.log('token from checkAuth.....', token)
    if (!token) {
      next(new Error('No token'));
    } else {
        var user = jwt.decode(token, 'secret');
        var queryStr = "select * from users where userName = ?";

        db.query(queryStr, user, function(err, userInfo) {
          if(userInfo.length !== 0) {
            res.send(200);
          } else {
            res.send(401);
          }
        });
      }
  }

};

// AsyncStorage.multiGet(['token', 'user']).then((data) => {
      //make a call to backend for validating token
    //   if (data[0][1]) {
    //     console.log("Token...", data[0][1]);
    //     var user = data[1][1];
    //     return this.props.navigator.push({
    //   title: "Welcome",
    //   component: Main,
    //   passProps: {user}
    // });
    //     //return utils.navigateTo.call(this, "Welcome", Main, {user});
    //   }
    // })
