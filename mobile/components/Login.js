'use strict';
var React = require('react-native');
var Main = require('./Main');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;
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
    var options = {
      reqBody: { userName: this.state.username, password: this.state.password }
    };
    var component = this;
    utils.makeRequest('login', component, options)
    .then((response) => {
      console.log('response body from login: ', response);
      if(response.error) {
        if(response.error === 'Username does not exist') {
          this.setState({validUsername: false, username: '', password: ''});
        } else if(response.error === 'Username and password do not match') {
          this.setState({validPassword: false, username: '', password: ''});        }
      } else {
        // AsyncStorage.multiSet([['token', response.token],['user', response.userId.toString()]])
        AsyncStorage.setItem('token', response.token)
        .then(() => {
          console.log('from login client.....', response.token);
          utils.navigateTo.call(component, "Welcome", Main, {});
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
      <View style={ styles.loginContainer }>
        <ScrollView ref="scrollView">
          
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Image 
              style={{ height: DeviceHeight/2.15, width: DeviceWidth }} 
              source={require('../assets/logo.png')}/>
          </View>
          
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
        </ScrollView>

        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 30}}>
          <TouchableHighlight 
            onPress={ this.submitLogin.bind(this) }
            style={[styles.loginSignup, {backgroundColor: '#FFC107'}]}
            underlayColor='#FFC107'>
              <Text style={ styles.whiteFont }>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={ utils.navigateTo.bind(this, 'Signup', require('./Signup'), {}) }
            style={ [styles.loginSignup, {marginLeft: 25}] }
            underlayColor='transparent'>
            <Text style={ styles.whiteFont }>Sign Up</Text>
          </TouchableHighlight>
        </View>

      </View>

    );
  }
};

module.exports = Login;





