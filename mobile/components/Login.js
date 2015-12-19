'use strict';
var React = require('react-native');
var Main = require('./Main');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');

var {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Component,
  NavigatorIOS,
  AsyncStorage,
  ScrollView
} = React;

class Login extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      validUsername: true,
      validPassword: true
    };
  }
  /**
   * Posts the user login details to the server for verification, then redirects user to Main Tours page with successful login.
   *
   */
  submitLogin () {
    this.setState({validUsername: true, validPassword: true});

    var reqBody = {
      userName: this.state.username,
      password: this.state.password
    };

    utils.makeRequest('login', reqBody)
    .then((response) => {
      console.log('response body from login: ', response);
      if(response.error) {
        if(response.error === 'Username does not exist') {
          this.setState({validUsername: false, username: '', password: ''});
        } else if(response.error === 'Username and password do not match') {
          this.setState({validPassword: false, username: '', password: ''});        }
      } else {
        var user = response.userInfo;
        var token = response.token;
        console.log(user, token)
        AsyncStorage.multiSet([
          ['token', token],
          ['user', user.id.toString()]
        ], function(err) {
          if(err) {
            console.error('Storage error', err)
          }
        });
        utils.navigateTo.call(this, "Welcome", Main, {user});
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
      <View style={ styles.loginContainer }>
      <ScrollView ref="scrollView">
      <Image style = {{height: 300, width: 320}} source={require('../assets/logo.png')}/>
      <View>
        <View style={ styles.inputs }>
          <View style={ styles.inputContainer }>
            <Image style={ styles.inputIcon } source={{ uri: 'http://i.imgur.com/iVVVMRX.png' }}/>
            <TextInput 
              style={ [styles.input, styles.whiteFont] }
              placeholder="Username"
              placeholderTextColor="#FFF"
              value={ this.state.username }
              onChange={ utils.usernameInput.bind(this) }
              ref='username'
              onFocus={this.inputFocused.bind(this, 'username')}
            />
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
              ref="password"
              onFocus={this.inputFocused.bind(this,'password')} />
          </View>

          <Text style={ styles.whiteFont }>
            { this.state.validUsername ? '' : 'Sorry this username does not exist, please try again' } 
          </Text>
          <Text style={ styles.whiteFont }>
            { this.state.validPassword ? '' : 'Sorry this username and password do not match, please try again' }
          </Text>

        </View>
        </View>
        </ScrollView>

        <View style={{flexDirection: 'row'}}>
        <TouchableHighlight 
          onPress={ this.submitLogin.bind(this) }
          style={[styles.loginSignup, {backgroundColor: '#FFC107'}]}>
            <Text style={ styles.whiteFont }>Login</Text>
        </TouchableHighlight>
          <TouchableHighlight
            onPress={ utils.navigateTo.bind(this, 'Signup', require('./Signup'), {}) }
            style={styles.loginSignup}>
            <Text style={ styles.whiteFont }>Sign Up</Text>
          </TouchableHighlight>
        </View>
</View>

    );
  }
};

module.exports = Login;





