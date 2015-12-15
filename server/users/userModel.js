/**
 * A module that accesses the mysql database and responds to requests from the controller
 * @module users/userModel
 */

var db = require('../db');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;

module.exports = {
  /**
   * Queries database for a userName.
   * If the userName already exists in the database, the callback will take a defined error.
   * If the userName does not exist then the callback will take an undefined error and the results of the query.
   *
   * @param {string} params - a userName
   * @param {function} callback - a callback which will take the arguments err and results from the database query
   */
  checkNameAvailability: function(params, callback) {
    var queryStr = "select userName from users where userName = ?";
    db.query(queryStr, params, function(err, results) {
      if(results.length !== 0) {
        callback("Username already exists");
      } else {
        callback(err, results[0]);
      }
    });
  },

  /**
   * Inserts user information into the database
   *
   * @param {array} params - an array containing the userName, firstName, lastName, and password
   * @param {function} callback - a callback which will take the arguments err and results from the database query
   */
  signup: function(params, callback) {
    var queryStr = "insert into users(userName, firstName, lastName, password) \
                    value (?, ?, ?, ?)";
    db.query(queryStr, params, function(err, results) {
      if(err) {
        callback(err);
      } else {
        // console.log("insertid......: ", results.insertId)
        var userQuery = "SELECT * from users WHERE id = ?";
          
        db.query(userQuery, results.insertId, function(err, info) {
          if (err) {
            console.log(err);
          }
          //generate a salt
          bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) {
              console.log(err);
            }
            // hash the password along with our new salt
            bcrypt.hash(info[0].password, salt, null, function (err, hash) {
              if (err) {
                console.log(err);
              }
              // override the cleartext password with the hashed one
              var userUpdateQuery = 'UPDATE users SET password=' + 
                                    "'" + hash + "'" + ', salt=' + 
                                    "'" +salt + "'" + ' WHERE Id = ?';
              db.query(userUpdateQuery, results.insertId, function(err, updatedUserInfo) {
                if (err) {
                  console.log(err);
                }
                // console.log('updatedUserInfo......', updatedUserInfo);
              });
            });
          });
        });
        // console.log("signup successful: ", results)
        callback(err, results[0]);        
      }
    });
  },

  /**
   * Queries database for user information given a specific userName
   *
   * @param {string} params - a userName
   * @param {function} callback - a callback which will take the arguments err and results from the database query
   */
  getUserInfo: function(params, callback) {
    var queryStr = "select * from users where userName = ?";
    db.query(queryStr, params, function(err, results) {
      if(err) {
        callback(err);
      } else {
        callback(err, results[0]);
      }
    })
  },

  comparePasswords: function (savedPassword, candidatePassword) {
    var defer = Q.defer();
    // var savedPassword = this.password;
    bcrypt.compare(savedPassword, candidatePassword, function (err, isMatch) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(isMatch);
      }
    });
    return defer.promise;
  },

  /**
   * Queries database for a userName.
   * If the userName does not exist in the database, the callback will take a defined error.
   * If the userName does exist then the password will be checked against the inputted password.
   * If the password does not match, the callback will take a defined error.
   * If the password does match, the callback will take an undefined error and the results of the query.
   *
   * @param {string} params - a tuple containing the userName and password
   * @param {function} callback - a callback which will take the arguments err and results from the database query
   */
  checkUserPassword: function(params, callback) {
    var queryStr = "select * from users where userName = ?";
    db.query(queryStr, params[0], function(err, results) {
      if(results.length === 0) {
        callback("Username does not exist");
      } else {
        if(results[0].password !== params[1]) {
          callback("Username and password do not match");
        } else {
          results[0].password = "";//Do not send the password back to the client
          callback(err, results[0]);          
        }
      }
    });
  },

};
