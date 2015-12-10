'use strict';
 
// var Button = require('react-native-button');
var React = require('react-native');
var AllTours = require('./AllTours');
var CreateTour = require('./CreateTour');

var {
  StyleSheet,
  View,
  Component,
  Text,
  TouchableHighlight
 } = React;
 
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId
    };
  }

  publicTours () {
    this.props.navigator.push({
      title: "All Tours",
      component: AllTours,
      passProps: {}
    });
  }

  userTours () {
    alert("Called");
    this.props.navigator.push({
      // title: "My Tours",
      // component: UserTours,
      title: "Create Tour",
      component: CreateTour,
      passProps: {}
    });
  }  

  render () {
    return (

      <View style={styles.container}>
        
        <TouchableHighlight onPress={ this.userTours.bind(this) } style={styles.touchable} underlayColor="white">
          <View style={styles.button1}><Text style={styles.buttonText}>Your Tours</Text></View>  
        </TouchableHighlight>

        <TouchableHighlight onPress={ this.publicTours.bind(this) } style={styles.touchable} underlayColor="white">
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
