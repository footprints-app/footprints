'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Login = require('./Login');
var Main = require('./Main');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');

var {
  View,
  Text,
  TextInput,
  Image,
  Component,
  TouchableHighlight,
  ScrollView
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
    var reqBody = {
      userName: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password
    };

    utils.makeRequest('signup', reqBody)
      .then((response) => {
        if( response.error ) {
          this.setState({ validUsername: false, firstName: '', lastName: '', username: '', password: '' });
        } else {
          var user = response;
          utils.navigateTo.call(this, "Tours", Main, {user} );
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
        <View style  = {{flex: 1}}>
          <Image style = {{height: 270, width: 375}} source={require('../assets/logogold.png')}/>
        </View>
      <View>
        <View style={ {marginTop: 20} }>
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
        </View>
        </ScrollView>

        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            onPress={ this.submitSignup.bind(this) }
            style={[styles.loginSignup, {backgroundColor: '#00BCD4'}]}>
            <Text style={ styles.whiteFont }>Sign Up</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={ utils.navigateTo.bind(this, 'Login', Login, {}) }
            style={styles.loginSignup}>
            <Text style={ styles.whiteFont }>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

module.exports = Signup;





