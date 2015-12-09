var users = require('./userModel.js');

module.exports = {

  signup: function (req, res, next) {
    var params = [req.body.userName, req.body.firstName, req.body.lastName, req.body.password];
    users.signup(params, function(err, results) {
      if(err) {
        console.error(err);
      }
      res.json(results);
    })
  }

};
