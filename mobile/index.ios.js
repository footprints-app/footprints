/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Login = require('./components/Login');
var Main = require('./components/Main');
var MyTours = require('./components/MyTours');
var AllTours = require('./components/AllTours');
var CreateTour = require('./components/CreateTour');

var {
  AppRegistry,
  StyleSheet,
  Component,
  Navigator,
  View
} = React;

class mobile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      token: null
    };
  }

  renderScene (route, navigator) {
  var Component = route.component;
  return (
      <View style={styles.container}>
        <Component
          route={route}
          navigator={navigator}
          topNavigator={navigator}/>
      </View>
    )
  }

  render () {
    return(
      <Navigator
        sceneStyle={styles.container}
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={this.renderScene}
        tintColor='#D6573D'
        barTintColor='#0097A7'
        titleTextColor='#D6573D'
        navigationBarHidden={true}
        initialRoute={{
          title: 'Login',
          component: Login,
        }} />
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('mobile', () => mobile);
