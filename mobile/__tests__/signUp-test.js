/** This is an example of unit testing using Jest, these are the kinds of tests we use to make sure our functions work properly **/

'use strict';

/* The of the file name of the test should be the file name of the function we're testing + "-test" 

By default, Jest automatically makes all calls to require() return a mocked version of the real module 
– so we need to tell Jest not to mock the file we want to test or else require('../signUp') will return a mock.
*/
jest.dontMock('../signUp');

var React = require('react-native');

var signUp = require('../signUp');
var username = 'username2015';
var first = 'User';
var last = 'Name';
var password = 'password1';
var rootUrl =  'http://localhost:8000';  

describe('signUp', function() {
  beforeEach(function() {

  });

  it('calls into fetch with the correct params', function() {
    signUp(username, first, last, password, rootUrl);
    // Now make sure that $.ajax was properly called during the previous
    // 2 lines
    expect(fetch).toBeCalledWith('http://localhost:8000', {
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
    });
  });

});

