var db = require('../db');

module.exports = {

  checkNameAvailability: function(params, callback) {
    var queryStr = "select userName from users where userName = ?";
    db.query(queryStr, params, function(err, results) {
      //Check if user already exists:
      if(results.length !== 0) {
        callback("Username already exists!");
      } else {
        callback(err, results);
      }
    });
  },

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
