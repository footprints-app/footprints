'use strict';
var React = require('react-native');
var Login = require('../components/Login');

var {
  AsyncStorage,
  NavigationBar
} = React;

var request_url = 'http://localhost:8000';
//var request_url = 'http://10.6.32.174:8000';
// var request_url = 'http://thesisserver-env.elasticbeanstalk.com';

var requests = {
    signup: { reqMethod: 'POST', endPoint: '/users/signup' },
    login: { reqMethod: 'POST', endPoint: '/users/login' },
    allTours: { reqMethod: 'GET', endPoint: '/tours/alltours'},
    myTours: {reqMethod: 'GET', endPoint: '/tours/mytours/'},
    tour: {reqMethod: 'GET', endPoint: '/tours/tour/'},
    createTour: {reqMethod: 'POST', endPoint: '/tours/createtour'},
    addPlace: {reqMethod: 'POST', endPoint: '/tours/addplace'},
    editTour: {reqMethod: 'PUT', endPoint: '/tours/edit/'},
    deletePlace: {reqMethod: 'DELETE', endPoint: '/tours/deleteplace/'},
    editPlace: {reqMethod: 'PUT', endPoint: '/tours/editplace/'},
    deleteTour: {reqMethod: 'DELETE', endPoint: '/tours/delete/'},
    addTourPhoto: {reqMethod: 'POST', endPoint: '/tours/tourphoto/'},
    addPlacePhoto: {reqMethod: 'POST', endPoint: '/tours/placephoto/'},
    placeOrders: {reqMethod: 'PUT', endPoint: '/tours/updateTourPlaces/'},
    addPlaceAudio: {reqMethod: 'POST', endPoint: '/tours/addaudio/'}
  };

var token = '';

var Utility = {

  /**
   * Updates first name property of state to user input.
   *
   * @param {event} text input event
   */
  firstNameInput: function(event) {
    this.setState({ firstName: event.nativeEvent.text });
  },

  /**
   * Updates last name property of state to user input.
   *
   * @param {event} text input event
   */
  lastNameInput: function(event) {
    this.setState({ lastName: event.nativeEvent.text });
  },

  /**
   * Updates username property of state to user input.
   *
   * @param {event} text input event
   */
  usernameInput: function(event) {
    this.setState({ username: event.nativeEvent.text });
  },

  /**
   * Updates password property of state to user input.
   *
   * @param {event} text input event
   */
  passwordInput: function(event) {
    this.setState({ password: event.nativeEvent.text });
  },

  /**
   * Navigates user to the next component, passing specificed props.
   *
   * @param {string, component, object} title of next component, component you want to route to, props to pass to next component.
   */
  navigateTo: function(titleName, toComponent, props) {
    console.log('navigate: ', titleName);
    var navigator = this.props.navigator || this.navigator;
    console.log('navigator', navigator);
    navigator.push({
      title: titleName,
      component: toComponent,
      passProps: props
    });
  },

  myTourNavigateTo: function(titleName, toComponent, props) {
    console.log('navigate: ', titleName);
    var navigator = this.props.navigator || this.navigator;
    console.log('navigator', navigator);
    navigator.push({
      title: titleName,
      component: toComponent,
      passProps: props,
      leftButtonTitle: " "
    });
  },

  /**
   * Accesses the token from AsyncStorage.
   *
   * @return {Promise} promise with token string
   */
  getToken: function() {
    return AsyncStorage.getItem('token')
    .then((token) => {
      // console.log('token in getToken: ', token);
      return token;
    })
    .catch((error) => {
      return '';
      console.log('error from getToken');
      console.warn(error)
    });
  },

   /**
   * Calls fetch to make a specified API request to the server.
   *
   * @param {string, string, object, object} reqUrl is the root url + parameters, requestMethod, header and body are the paramaters for fetch.
   * @return {Promise} promise with parsed API response
   */
  requestHelper: function(reqUrl, requestMethod, header, body) {
    var requestObject = { method: requestMethod, headers: header};
    if(requestMethod !== 'GET') {
      requestObject['body'] = JSON.stringify(body);
      requestObject.headers['Content-Type'] = 'application/json';
    }
    return fetch(reqUrl, requestObject)
            .then((response) => response.json());
  },

  /**
   * Creates the parameters for the the fetch request and calls requestHelper to make the appropriate API request.
   *
   * @param {string, object, object} requestType is a key in the request's object, component is the React component from where the function is being called, options is holds the option requestBody and requestParams
   * @return {Promise} promise with the parsed response
   */
  makeRequest: function(requestType, component, options) {
    var requestMethod = requests[requestType].reqMethod;
    var reqBody = options.reqBody || null;
    var param = options.reqParam || '';
    var reqUrl = request_url + requests[requestType].endPoint + param;
    var headerBody = {
      'Accept': 'application/json',
      'x-access-token': token,
      'If-Modified-Since': 'Sat, 29 Oct 1994 19:43:31 GMT'
    };
    if(requestType !== 'signup' && requestType !== 'login') {
      return this.getToken().then((token) => {
        headerBody['x-access-token'] = token;
        return this.requestHelper(reqUrl, requestMethod, headerBody, reqBody)
          .then((response) => {
            if(response.status === 404) {
              this.navigateTo.call(component, 'Login', Login, {});
            } else {
              return response;
            }
          });
      });
    } else {
      return this.requestHelper(reqUrl, requestMethod, headerBody, reqBody);
    }
  }
}

module.exports = Utility;
