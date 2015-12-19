'use strict';
var React = require('react-native');

var request_url = 'http://localhost:8000';
// var request_url = 'http://thesisserver-env.elasticbeanstalk.com';

var requests = {
    signup: { reqMethod: 'POST', endPoint: '/users/signup' },
    login: { reqMethod: 'POST', endPoint: '/users/login' },
    allTours: { reqMethod: 'GET', endPoint: '/tours/alltours'},
    myTours: {reqMethod: 'GET', endPoint: '/tours/mytours/'},
    tour: {reqMethod: 'GET', endPoint: '/tours/'},
    createTour: {reqMethod: 'POST', endPoint: '/tours/createtour'},
    addPlace: {reqMethod: 'POST', endPoint: '/tours/addplace'},
    editTour: {reqMethod: 'PUT', endPoint: '/tours/edit/'},
    deletePlace: {reqMethod: 'DELETE', endPoint: '/tours/deleteplace/'},
    editPlace: {reqMethod: 'PUT', endPoint: '/tours/editplace/'},
    deleteTour: {reqMethod: 'DELETE', endPoint: '/tours/delete/'},
    addTourPhoto: {reqMethod: 'POST', endPoint: '/tours/tourphoto/'}
  }; 

var Utility = {

  //CreateTour.js helper functions
  /**
   * Updates tourName property of state to user input.
   *
   * @param {event} text input event
   */
  tourNameInput: function(event) {
    console.log('event from tournameinput: ', event);
    this.setState({ tourName: event.nativeEvent.text });
  },
  /**
   * Updates description property of state to user input.
   *
   * @param {event} text input event
   */
  descriptionInput: function(event) {
    this.setState({ description: event.nativeEvent.text });
  },
  /**
   * Updates category property of state to user input.
   *
   * @param {event} text input event
   */
  categoryInput: function(event) {
    this.setState({ category: event.nativeEvent.text });
  },
  /**
   * Updates duration property of state to user input.
   *
   * @param {event} text input event
   */
  durationInput: function(event) {
    this.setState({ duration: event.nativeEvent.text });
  },
  /**
   * Updates cityName property of state to user input.
   *
   * @param {event} text input event
   */
  cityNameInput: function(event) {
    this.setState({ cityName: event.nativeEvent.text });
  },
  /**
   * Updates state property of state to user input.
   *
   * @param {event} text input event
   */
  stateInput: function(event) {
    this.setState({ state: event.nativeEvent.text });
  },
  /**
   * Updates country property of state to user input.
   *
   * @param {event} text input event
   */
  countryInput: function(event) {
    this.setState({ country: event.nativeEvent.text });
  },
  /**
   * Updates firstName property of state to user input.
   *
   * @param {event} text input event
   */

   //end of CreateTour.js helper functions
   
  firstNameInput: function(event) {
    this.setState({ firstName: event.nativeEvent.text });
  },

  /**
   * Updates last property of state to user input.
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

  setStateFromInput: function(state, event) {
    console.log("Event from setStateFromInput: ", event);
    // this.setState(function() {
    //   var toUpdate = {};
    //   toUpdate[state][stateProperty] = event.nativeEvent.text;
    //   return toUpdate;
    // });
    var toUpdate = {};
    toUpdate[state] = event.nativeEvent.text;
    this.setState(toUpdate);
  },

  /**
   * Navigates user to the next component, passing specificed props.
   *
   * @param {string, component, object} title of next component, component you want to route to, props to pass to next component.
   */
  navigateTo: function(titleName, toComponent, props) {
    console.log('navigate: ', titleName);
    this.props.navigator.push({
      title: titleName,
      component: toComponent,
      passProps: props
    });
  },

  /**
   * Calls fetch to make a specified API request to the server. 
   *
   * @param {string, object, [string]} requestType is a key in the request's object, reqBody is the object that is being sent in the request, reqParam is an optional argument for ids.
   * @return {Promise} promise with the parsed response body
   */
  makeRequest: function(requestType, reqBody, reqParam, token) {
    var param = reqParam || '';
    var reqUrl = request_url + requests[requestType].endPoint + param;
    // console.log('request url: ', reqUrl);
    // console.log('reqParam: ', param);
    // console.log('reqBody in request: ', reqBody);
    console.log('token in makeRequest: ', token);
    var requestMethod = requests[requestType].reqMethod;
    if(requestMethod === 'GET') {
      return fetch(reqUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Allow-Control-Allow-Origin': '*',
            'x-access-token': token,
            'If-Modified-Since': 'Sat, 29 Oct 1994 19:43:31 GMT'
          }
        })
      .then(response => response.json());
    } else {
      return fetch(reqUrl, 
        {
          method: requestMethod,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify(reqBody)
        }
      ).then((response) => response.json()); 
    }
  }
}

module.exports = Utility;
