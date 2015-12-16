'use strict';
 
// var Button = require('react-native-button');
var React = require('react-native');
var AllTours = require('./AllTours');
var MyTours = require('./MyTours');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');

var {
  View,
  Component,
  Text,
  TouchableHighlight
 } = React;
 
class Main extends Component {

  /**
   * Creates an instance of Main and sets the state with user details (needed to pass to MyTours component).
   * 
   * @constructor
   * @param {object} props is the user object pass from the Login or Signup components.
   * @this {Main}
   */
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  /**
   * Redirects the user to the MyTours view and passes the user object as the props to the MyTours component.
   */
  userTours () {
    var userId = 2/*this.state.user.id*/;
    console.log('user in Main: ', this.state.user);
    utils.navigateTo.call(this, "Your Tours", MyTours, {userId});
  }  

  render () {
    return (

      <View style={ styles.mainContainer }>

        <View  >
        <TouchableHighlight
          onPress={ this.userTours.bind(this) }
          style={ styles.mainTouchable } underlayColor="white">
          <View style={ styles.mainButton }><Text style={ styles.mainButtonText }>Your Tours</Text></View>
        </TouchableHighlight>
        </View>

        <View style={styles.mainButtonBottom}>
        <TouchableHighlight
          onPress={ utils.navigateTo.bind(this, "All Tours", AllTours, {}) }
          style={ styles.mainTouchable } underlayColor="white">
          <View style={ styles.mainButton }><Text style={ styles.mainButtonText }>All Tours</Text></View>
        </TouchableHighlight>
        </View>

      </View>
    );
  }
};

module.exports = Main;
