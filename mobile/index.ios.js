/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Login = require('./components/Login');
var MyTours = require('./components/MyTours');
var AllTours = require('./components/AllTours');
var CreateTour = require('./components/CreateTour');

var {
  AppRegistry,
  StyleSheet,
  Component,
  Navigator,
  TabBarIOS
} = React;

class mobile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: ''
    };
  }

  selectTab (tab) {
    this.setState({
      selectedTab: tab
    });
  }

  render () {
    return (
      //<Navigator style={styles.container} initialRoute={{ title: 'Login', component: Login }} />
      <TabBarIOS
        tintColor="#00BCD4"
        barTintColor="#F0F0F0"
        selectedTab={this.state.selectedTab}>

        <TabBarIOS.Item
          title="My Tours"
          icon={require('./assets/mytoursicon.png')}
          selected={this.state.selectedTab === 'myTours'}
          onPress={this.selectTab.bind(this, 'myTours')}>
          <MyTours/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="All Tours"
          icon={require('./assets/alltoursicon.png')}
          selected={this.state.selectedTab === 'allTours'}
          onPress={this.selectTab.bind(this, 'allTours')}>
          <AllTours/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Create Tour"
          icon={require('./assets/createtouricon.png')}
          selected={this.state.selectedTab === 'createTour'}
          onPress={this.selectTab.bind(this, 'createTour')}>
          <CreateTour/>
        </TabBarIOS.Item>
      </TabBarIOS>
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
