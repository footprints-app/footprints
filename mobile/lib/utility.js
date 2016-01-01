'use strict';
var React = require('react-native');
var Login = require('../components/Login');

var {
  AsyncStorage
} = React;

var request_url = 'http://localhost:8000';
// var request_url = 'http://10.6.32.174:8000';
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
  googlePlacesKey: 'AIzaSyBpYCMNdcQg05gC87GcQeEw866rHpA9V1o',

  googlePlacesStyles: {
              description: {
                fontWeight: 'bold',
                color: '#FFF'
              },
              textInputContainer: {
                backgroundColor: '#D8D8D8',
                height: 30,
                borderRadius: 5,
                borderColor: '#cccccc',
                marginBottom: 10,
              },
              textInput: {
                color: '#FFF',
                backgroundColor: '#D8D8D8',
                height: 30,
                borderRadius: 5,
                padding: 7,
                borderColor: '#cccccc',
                borderWidth: 1,
                marginBottom: 6,
                fontSize: 17
              }
  },

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
    var navigator = this.props.navigator || this.navigator;
    navigator.push({
      title: titleName,
      component: toComponent,
      passProps: props
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
    // console.log('requestObject: ', requestObject);
    // console.log('headers: ', requestObject.headers);
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
    console.log('makeRequest reached');
    var reqBody = options.reqBody || null;
    var param = options.reqParam || '';
    var reqUrl = request_url + requests[requestType].endPoint + param;
    console.log('request url: ', reqUrl);
    console.log('reqParam: ', param);
    console.log('reqBody in request: ', reqBody);
    
    var headerBody = {
      'Accept': 'application/json',
      'x-access-token': token,
      'If-Modified-Since': 'Sat, 29 Oct 1994 19:43:31 GMT'
    };

    if(requestType !== 'signup' && requestType !== 'login') {
      return this.getToken().then((token) => {
        console.log('token in makeRequest: ', token);
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
