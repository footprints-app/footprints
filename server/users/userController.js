var users = require('./userModel.js');

module.exports = {

  signup: function (req, res, next) {
    var params = [req.body.userName, req.body.firstName, req.body.lastName, req.body.password];
    users.checkNameAvailability(params[0], function(err, results) {
      if(err) {
        console.error(err);
        res.status(200).send(err);
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
    // users.signup(params, function(err, results) {
    //   if(err) {
    //     console.error(err);
    //   }
    //   res.json(results);
    // })
  }

};
