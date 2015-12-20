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
    var that = this;
    AsyncStorage.multiGet(['token', 'user'])
    .then(function(data) {
      console.log('in main userinfo', data);
      if(data) {
        console.log('reached')
        that.setState({
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

  selectTab (tab, ref) {
    if(this.state.selectedTab !== tab) {
      this.setState({
        selectedTab: tab
      });
    } else {
      this.refs[ref].popToTop()
    }
  }

  getUserId () {
    return this.state.userId
  }

  render () {
    return (
      <TabBarIOS
        tintColor="#00BCD4"
        barTintColor="#F0F0F0"
        selectedTab={this.state.selectedTab}>

        <TabBarIOS.Item
          title="My Tours"
          icon={require('../assets/mytoursicon.png')}
          selected={this.state.selectedTab === 'myTours'}
          onPress={this.selectTab.bind(this, 'myTours', 'myToursView')}>
          <NavigatorIOS
            ref="nav"
            barTintColor="#0097A7"
            tintColor="#FFF"
            titleTextColor="#FFF"
            style={styles.container}
            initialRoute={{ 
              title: 'My Tours', 
              component: MyTours, 
              rightButtonTitle: 'Edit', 
              onRightButtonPress: () => {
                this.refs.nav.navigator.push({
                  title: "My Tours",
                  component: MyTours,
                  rightButtonTitle: 'Done',
                  passProps: { editMode: true },
                  onRightButtonPress: () => { this.refs.nav.navigator.pop();}
                });}
            }}
            ref="myToursView"
             />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="All Tours"
          icon={require('../assets/alltoursicon.png')}
          selected={this.state.selectedTab === 'allTours'}
          onPress={this.selectTab.bind(this, 'allTours', 'allToursView')}>
          <NavigatorIOS
            barTintColor="#0097A7"
            tintColor="#FFF"
            titleTextColor="#FFF"
            style={styles.container}
            ref="allToursView"
            initialRoute={{ title: 'All Tours', component: AllTours }} />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Create Tour"
          icon={require('../assets/createtouricon.png')}
          selected={this.state.selectedTab === 'createTour'}
          onPress={this.selectTab.bind(this, 'createTour', 'createTourView')}>
          <NavigatorIOS
            barTintColor="#0097A7"
            tintColor="#FFF"
            titleTextColor="#FFF"
            style={styles.container}
            ref="createTourView"
            initialRoute={{ title: 'Create a Tour', component: CreateTour }} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
};

module.exports = Main;
