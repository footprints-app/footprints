var db = require('../db');

module.exports = {

  signup: function(params, callback) {
    var queryStr = "insert into users(userName, firstName, lastName, password) \
                    value (?, ?, ?, ?)";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    })
  }

};
