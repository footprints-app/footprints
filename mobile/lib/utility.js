'use strict';
var React = require('react-native');

var Utility = {

  request_url: 'http://localhost:8000',
  //CreateTour.js helper functions
  /**
   * Updates tourName property of state to user input.
   *
   * @param {event} text input event
   */
  tourNameInput: function(event) {
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

  /**
   * Navigates user to the next component, passing specificed props.
   *
   * @param {string, component, object} title of next component, component you want to route to, props to pass to next component.
   */
  navigateTo: function(titleName, toComponent, props) {
    // console.log('navigate: ', titleName);
    this.props.navigator.push({
      title: titleName,
      component: toComponent,
      passProps: props
    });
  }
}

module.exports = Utility;
