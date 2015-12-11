'use strict';
var React = require('react-native');

var Utility = {

  request_url: 'http://localhost:8000',
  /**
   * Updates firstName property of state to user input.
   *
   * @param {event} text input event
   */
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
   * @param {component, string, component, object} component navigating away from, title of next component, next component, props to pass.
   */
  navigateTo: function(startComponent, titleName, toComponent, props) {
    console.log('navigate: ', titleName);
    start.props.navigator.push({
      title: titleName,
      component: toComponent,
      passProps: props
    });
  }
}

module.exports = Utility;