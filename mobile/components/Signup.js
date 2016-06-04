'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;
var Login = require('./Login');
var MyTours = require('./MyTours');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');
var Main = require('./Main');

var {
  View,
  Text,
  TextInput,
  Image,
  Component,
  TouchableHighlight,
  ScrollView,
  AsyncStorage
} = React;

class Signup extends Component {

  /**
   * Creates an instance of Signup and sets the state with empty user details.
   * @constructor
   * @this {Signup}
   */
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      validUsername: true
    };
  }

  /**
   * Posts the user details to the server then redirects user to Main Tours page with the userId as a prop for the component
   */
  submitSignup () {
    this.setState({ validUsername: true });

    var options = {
      reqBody: {
        userName: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password
      }
    };
    var component = this;
    utils.makeRequest('signup', component, options)
    .then((response) => {
      if( response.error ) {
        this.setState({ validUsername: false, firstName: '', lastName: '', username: '', password: '' });
      } else {
        AsyncStorage.setItem('token', response.token)
        .then(() => {
          utils.navigateTo.call(component, "Main", Main, {});
        });
      }
    })
    .catch((error) => {
      console.warn(error);
    });
  }


  inputFocused (refName) {
    var that = this;
    setTimeout(function() {
      var scrollResponder = that.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(that.refs[refName]),
        80,
        true
      );
    }, 50);
  }

  render () {
    return (
      <View style={ styles.signupContainer }>
        <ScrollView ref="scrollView">

        <View style  = {{ justifyContent: 'center', flex: 1 }}>
          <Image
            style = {{ height: DeviceHeight/2.15, width: DeviceWidth }}
            source={require('../assets/logogold.png')}/>
        </View>

        <View style={ [styles.inputs, {marginTop: 15}] }>
          <View style={ styles.inputContainer }>
            <Image style={ styles.inputIcon } source={{ uri: 'http://i.imgur.com/iVVVMRX.png' }}/>
            <TextInput
              style={ [styles.input, styles.whiteFont] }
              placeholder="First Name"
              placeholderTextColor="#FFF"
              value={ this.state.firstName }
              onChange={ utils.firstNameInput.bind(this) }
              ref='firstname'
              onFocus={this.inputFocused.bind(this, 'firstname')}/>
          </View>

          <View style={ styles.inputContainer }>
            <Image style={ styles.inputIcon } source={{ uri: 'http://i.imgur.com/iVVVMRX.png' }}/>
            <TextInput
              style={ [styles.input, styles.whiteFont] }
              placeholder="Last Name"
              placeholderTextColor="#FFF"
              value={ this.state.lastName }
              onChange={ utils.lastNameInput.bind(this) }
              ref='lastname'
              onFocus={this.inputFocused.bind(this, 'lastname')}/>
          </View>

          <View style={ styles.inputContainer }>
            <Image style={ styles.inputIcon } source={{ uri: 'http://i.imgur.com/iVVVMRX.png' }}/>
            <TextInput
              style={ [styles.input, styles.whiteFont] }
              placeholder="Username"
              placeholderTextColor="#FFF"
              value={ this.state.username }
              onChange={ utils.usernameInput.bind(this) }
              ref='username'
              onFocus={this.inputFocused.bind(this, 'username')}/>
          </View>

          <View style={ styles.inputContainer }>
            <Image style={ styles.inputIcon } source={{ uri: 'http://i.imgur.com/ON58SIG.png' }}/>
            <TextInput
              password={true}
              style={ [styles.input, styles.whiteFont] }
              placeholder="Password"
              placeholderTextColor="#FFF"
              value={ this.state.password }
              onChange={ utils.passwordInput.bind(this) }
              ref='password'
              onFocus={this.inputFocused.bind(this, 'password')}/>
          </View>

            <Text style={ styles.whiteFont }>
            {this.state.validUsername ? '' : 'Sorry this username already exists, please try again'}
            </Text>

        </View>
        </ScrollView>

        <View style={{flexDirection: 'row', justifyContent: 'center' }}>

          <TouchableHighlight
            onPress={ this.submitSignup.bind(this) }
            style={[styles.loginSignup, {backgroundColor: '#00BCD4'}]}
            underlayColor='#00BCD4'>
            <Text style={ styles.whiteFont }>Sign Up</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={ utils.navigateTo.bind(this, 'Login', Login, {}) }
            style={ [styles.loginSignup, {marginLeft: 25}] }
            underlayColor='transparent'>
            <Text style={ styles.whiteFont }>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

module.exports = Signup;
