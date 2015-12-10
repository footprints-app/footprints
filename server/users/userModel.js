/**
 * A module that accesses the mysql database and responds to requests from the controller
 * @module users/userModel
 */

var db = require('../db');

module.exports = {
  /**
   * Queries database for a userName.
   * If the userName already exists in the database, the callback will take a valid error.
   * If the userName does not exist then the callback will take an undefined error and the results of the query.
   *
   * @param {string} params - a userName
   * @param {function} callback - a callback which will take the arguments err and results from the database query
   */
  checkNameAvailability: function(params, callback) {
    var queryStr = "select userName from users where userName = ?";
    db.query(queryStr, params, function(err, results) {
      if(results.length !== 0) {
        callback("Username already exists!");
      } else {
        callback(err, results);
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
        callback(err, results);        
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
        callback(err, results);
      }
    })
  }

};
