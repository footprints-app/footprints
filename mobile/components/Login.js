'use strict';
var React = require('react-native');
var Main = require('./Main');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS,
  NavigatorIOS
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
      // console.log('response body: ', response);
      if(response.error) {
        if(response.error === 'Username does not exist') {
          this.setState({validUsername: false, username: '', password: ''});
        } else if(response.error === 'Username and password do not match') {
          this.setState({validPassword: false, username: '', password: ''});
        }
      } else {
        var user = response;
        utils.navigateTo.call(this, "Welcome", Main, {user} );
      }
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
        
        <View style={styles.loginInputs}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
            <TextInput 
              style={[styles.input, styles.whiteFont]}
              placeholder="Username"
              placeholderTextColor="#FFF"
              value={this.state.username}
              onChange={utils.usernameInput.bind(this)}/>
          </View>
          <View style={styles.inputContainer}>
            <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
            <TextInput
              password={true}
              style={[styles.input, styles.whiteFont]}
              placeholder="Password"
              placeholderTextColor="#FFF"
              value={this.state.password}
              onChange={utils.passwordInput.bind(this)}/>
          </View>

          <Text style={styles.whiteFont}> {this.state.validUsername ? '' : 'Sorry this username does not exist, please try again'} </Text>
          <Text style={styles.whiteFont}> {this.state.validPassword ? '' : 'Sorry this username and password do not match, please try again'} </Text>

        </View>

        <TouchableHighlight onPress={ this.submitLogin.bind(this) } style={styles.touchable} underlayColor="#FF3366">  
          <View style={styles.signin}>
            <Text style={styles.whiteFont}>Login</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.loginSignup}>
          <Text style={styles.greyFont}>Do not have an account?</Text>
          <TouchableHighlight onPress={ utils.navigateTo.bind(this, 'Signup', require('./Signup'), {}) }>  
            <Text style={styles.whiteFont}>Sign Up</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

module.exports = Login;





