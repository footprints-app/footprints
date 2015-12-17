'use strict';
 
// var Button = require('react-native-button');
var React = require('react-native');
var AllTours = require('./AllTours');
var MyTours = require('./MyTours');
var CreateTour = require('./CreateTour');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');

var {
  View,
  Component,
  Text,
  TouchableHighlight,
  TabBarIOS,
  NavigatorIOS,
  AsyncStorage
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
      user: this.props.user,
      selectedTab: 'allTours',
      userId: null,
      token: null
    };
  }

  componentDidMount () {
    AsyncStorage.multiGet(['token', 'user'])
      .then(function(data) {
        if(data) {
          this.setState({
            token: data[0][1],
            userId: +data[1][1]
          });
        }
      });
  }
  /**
   * Redirects the user to the MyTours view and passes the user object as the props to the MyTours component.
   */
  userTours () {
    var userId = this.state.userId;
    console.log('user in Main: ', this.state.userId);
    utils.navigateTo.call(this, "Your Tours", MyTours, {userId});
  }

  selectTab (tab) {
    this.setState({
      selectedTab: tab
    });
  }

  getUserId () {
    return this.state.userId
  }

  render () {
    //return (

      //<View style={ styles.mainContainer }>
			//
      //  <View  >
      //  <TouchableHighlight
      //    onPress={ this.userTours.bind(this) }
      //    style={ styles.mainTouchable } underlayColor="white">
      //    <View style={ styles.mainButton }><Text style={ styles.mainButtonText }>Your Tours</Text></View>
      //  </TouchableHighlight>
      //  </View>
			//
      //  <View style={styles.mainButtonBottom}>
      //  <TouchableHighlight
      //    onPress={ utils.navigateTo.bind(this, "All Tours", AllTours, {}) }
      //    style={ styles.mainTouchable } underlayColor="white">
      //    <View style={ styles.mainButton }><Text style={ styles.mainButtonText }>All Tours</Text></View>
      //  </TouchableHighlight>
      //  </View>
			//
      //</View>

    return (
      <TabBarIOS
        tintColor="#00BCD4"
        barTintColor="#F0F0F0"
        selectedTab={this.state.selectedTab}>

        <TabBarIOS.Item
          title="My Tours"
          icon={require('../assets/mytoursicon.png')}
          selected={this.state.selectedTab === 'myTours'}
          onPress={this.selectTab.bind(this, 'myTours')}>
          <NavigatorIOS
            barTintColor="#0097A7"
            tintColor="#FFF"
            titleTextColor="#FFF"
            style={styles.container}
            initialRoute={{ title: 'My Tours', component: MyTours }} />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="All Tours"
          icon={require('../assets/alltoursicon.png')}
          selected={this.state.selectedTab === 'allTours'}
          onPress={this.selectTab.bind(this, 'allTours')}>
          <NavigatorIOS
            barTintColor="#0097A7"
            tintColor="#FFF"
            titleTextColor="#FFF"
            style={styles.container}
            initialRoute={{ title: 'All Tours', component: AllTours }} />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Create Tour"
          icon={require('../assets/createtouricon.png')}
          selected={this.state.selectedTab === 'createTour'}
          onPress={this.selectTab.bind(this, 'createTour')}>
          <NavigatorIOS
            barTintColor="#0097A7"
            tintColor="#FFF"
            titleTextColor="#FFF"
            style={styles.container}
            initialRoute={{ title: 'Create a Tour', component: CreateTour }} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
};

module.exports = Main;
