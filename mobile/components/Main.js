'use strict';

var React = require('react-native');
var AllTours = require('./AllTours');
var MyTours = require('./MyTours');
var CreateTour = require('./CreateTour');
var Settings = require('./Settings');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');

var {
  Component,
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
      selectedTab: 'allTours'
    };
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
          onPress={this.selectTab.bind(this, 'myTours', 'myToursView', MyTours)}>
          <NavigatorIOS
            barTintColor="#0097A7"
            tintColor="#FFF"
            titleTextColor="#FFF"
            style={styles.container}
            ref="myToursView"
            initialRoute={{
              title: 'My Tours',
              component: MyTours,
              rightButtonTitle: 'Edit',
              onRightButtonPress: () => {
                this.refs.myToursView.navigator.push({
                  title: "My Tours",
                  component: MyTours,
                  leftButtonTitle: ' ',
                  rightButtonTitle: 'Done',
                  passProps: { editMode: true },
                  onRightButtonPress: () => { this.refs.myToursView.navigator.pop();}
                });}
              }} />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="All Tours"
          icon={require('../assets/alltoursicon.png')}
          selected={this.state.selectedTab === 'allTours'}
          onPress={this.selectTab.bind(this, 'allTours', 'allToursView', AllTours)}>
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
          onPress={this.selectTab.bind(this, 'createTour', 'createTourView', CreateTour)}>
          <NavigatorIOS
            barTintColor="#0097A7"
            tintColor="#FFF"
            titleTextColor="#FFF"
            style={styles.container}
            ref="createTourView"
            initialRoute={{ title: 'Create a Tour', component: CreateTour }} />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Settings"
          icon={require('../assets/settingsicon.png')}
          selected={this.state.selectedTab === 'settings'}
          onPress={this.selectTab.bind(this, 'settings', 'settingsView', Settings)}>
          <NavigatorIOS
            barTintColor="#0097A7"
            tintColor="#FFF"
            titleTextColor="#FFF"
            style={styles.container}
            ref="settingsView"
            initialRoute={{ title: 'Profile', component: Settings }} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
};

module.exports = Main;
