'use strict';

var React = require('react-native');

/** function tasks the username, first name, last name, password and api root url as arguments;
    function call returns a user object **/
var signUp = function (username, first, last, password, urlRoot) {
  fetch(urlRoot + '/signup', 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        firstName: first,
        lasName: last,
        password: password
      })
    }
  ).then((response) => response.text())
  .then((responseText) => {
  // res.body: {id: <int>, userName: <string>, firstName: <string>, lastName: <string>}
    return {
        id: responseText.id,
        userName: responseText.userName,
        firstName: responseText.firstName,
        lastName: responseText.lastName
      }
  })
  .catch((error) => {
    console.warn(error);
  });
}

module.exports = signUp;

