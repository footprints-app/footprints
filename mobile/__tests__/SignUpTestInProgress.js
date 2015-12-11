/** This is an example of unit testing using Jest, these are the kinds of tests we use to make sure our functions work properly **/

'use strict';

/* The of the file name of the test should be the file name of the function we're testing + "-test" 

By default, Jest automatically makes all calls to require() return a mocked version of the real module 
– so we need to tell Jest not to mock the file we want to test or else require('../signUp') will return a mock.
*/
jest.dontMock('../components/Signup');
jest.setMock('react-native', {});
var TestUtils = require('react-addons-test-utils');

// var username = 'username2015';
// var first = 'User';
// var last = 'Name';
// var password = 'password1';
// var rootUrl =  'http://localhost:8000';  


describe('signUp', function() {

//   var node = this.refs.input;
// node.value = 'giraffe'
// ReactTestUtils.Simulate.change(node);

  it('calls into fetch with the correct params', function() {
    var Signup = require('../components/Signup');
    var signUpComponent = Signup(); 
    // var signUpComponent = TestUtils.renderIntoDocument(<Signup />);
    // var firstNameInput = signUpComponent

    signUpComponent.setState({username: 'username2015', firstName: 'User', lastName: 'Name', password: 'password1'});
    signUpComponent.postUserData();
    expect(signUpComponent.state.username).to.equal('username2015');

    //   fetch).toBeCalledWith('http://localhost:8000', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     userName: username,
    //     firstName: first,
    //     lastName: last,
    //     password: password
    //   })
    // });
  });

});

