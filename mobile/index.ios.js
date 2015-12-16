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
  NavigatorIOS,
  TabBarIOS
} = React;

class mobile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'main',
      userId: null
    };
  }

  selectTab (tab) {
    this.setState({
      selectedTab: tab
    });
  }

  render () {
    if(this.state.userId === null) {
      return(
        <NavigatorIOS style={styles.container} initialRoute={{ title: 'Login', component: Login }} />
      )
    }
    return (
      <TabBarIOS
        tintColor="#00BCD4"
        barTintColor="#F0F0F0"
        selectedTab={this.state.selectedTab}>

        <TabBarIOS.Item
          title="Home"
          icon={require('./assets/homeicon.png')}
          selected={this.state.selectedTab === 'main'}
          onPress={this.selectTab.bind(this, 'main')}>
          <Main/>
        </TabBarIOS.Item>

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
  }
});

AppRegistry.registerComponent('mobile', () => mobile);
