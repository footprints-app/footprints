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
var utils = require('./lib/utility');

var {
  AppRegistry,
  StyleSheet,
  Component,
  Navigator,
  View,
  AsyncStorage
} = React;

class mobile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tokenExists: false,
      initialTitle: undefined,
      initialComponent: undefined
    };
  }


  componentDidMount () {
    console.log('componentDidMount called');
    var that = this;
    utils.getToken()
    .then((token) => {
      if(token) {
        console.log('token in IOS: ', token);
        this.setState({tokenExists: true, initialTitle: 'Welcome', initialComponent: Main});
        console.log('this.state: ', this.state);
        utils.navigateTo.call(that, "Welcome", Main, {});
      } else {
        this.setState({initialTitle: 'Login', initialComponent: Login});
      }
    })
    .done();
  }

  // componentWillMount () {
  //   console.log('componentWillMount called');
  //   var that = this;
  //   utils.getToken()
  //   .then((token) => {
  //     if(token) {
  //       console.log('token in IOS: ', token);
  //       this.setState({tokenExists: true, initialTitle: 'Welcome', initialComponent: Main});
  //       console.log('this.state: ', this.state);
  //     } else {
  //       this.setState({initialTitle: 'Login', initialComponent: Login});
  //     }
  //   })
  //   .done();
  // }

  renderScene (route, navigator) {
    var Component = route.component;
    console.log('renderScene called');
    return (
        <View style={styles.container}>
          <Component
            route={route}
            navigator={navigator}
            topNavigator={navigator}/>
        </View>
      )
  }

 

  renderLogin () {
    return (
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
  

  render () {
    return (
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
