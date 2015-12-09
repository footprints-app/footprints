/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Login = require('./components/Login');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  NavigatorIOS,
  TabBarIOS
} = React;

class mobile extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <NavigatorIOS style={styles.container} initialRoute={{ title: 'Login', component: Login }} />   
    );
  }
}

var styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('mobile', () => mobile);
