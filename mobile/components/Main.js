'use strict';
 
// var Button = require('react-native-button');
var React = require('react-native');
var AllTours = require('./AllTours');
var MyTours = require('./MyTours');
var utils = require('../lib/utility');

var {
  StyleSheet,
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
    var user = this.state.user;
    utils.navigateTo.call(this, "Your Tours", MyTours, {user});
  }  

  render () {
    return (

      <View style={styles.container}>
        
        <TouchableHighlight onPress={ this.userTours.bind(this) } style={styles.touchable} underlayColor="white">
          <View style={styles.button1}><Text style={styles.buttonText}>Your Tours</Text></View>  
        </TouchableHighlight>

        <TouchableHighlight onPress={ utils.navigateTo.bind(this, "All Tours", AllTours, {}) } style={styles.touchable} underlayColor="white">
          <View style={styles.button2}><Text style={styles.buttonText}>All Tours</Text></View>  
        </TouchableHighlight>
      
      </View>          
    );
  }
};

var styles = StyleSheet.create({

  container: {
    marginTop: 65,
    padding: 10
  },
  button1: {
    height: 200,
    width: 200,
    backgroundColor: '#FFF366',
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 60,
    marginLeft: 75
  },
  button2: {
    height: 200,
    width: 200,
    backgroundColor: '#FFF366',
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 75
  },
  buttonText: {
    fontSize: 24,
    color: 'gray',
    alignSelf: 'center'
  },
  touchable: {
    borderRadius: 100
  }
});

module.exports = Main;
