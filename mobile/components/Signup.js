'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Login = require('./Login');
var Main = require('./Main');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Component,
  TouchableHighlight
} = React;

class Signup extends Component {

  /**
   * Creates an instance of Signup and sets the state with empty user details.
   *
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
      userId: ''
    };
  }

  /**
   * Posts the user details to the server then redirects user to Main Tours page with the userId as a prop for the component
   *
   */
  submitSignup () {
    console.log('signup called');
    fetch(utils.request_url + '/users/signup', 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: this.state.username,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password
        })
      }
    ).then((response) => response.text())
    .then((responseText) => {
      if(responseText = 'Username already exists!'){
        //re-render sign-up page to inform user that username already exists
      }
      // console.log('responseText: ', responseText);
      utils.navigateTo.call(this, "Tours", Main, {responseText});

    })
    .catch((error) => {
      console.warn(error);
    });
  }

  render () {
    return (

      <View style={styles.container}>
        <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
        
        <View style={styles.inputs}>

        <View style={styles.inputContainer}>
          <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
            <TextInput 
              style={[styles.input, styles.whiteFont]}
              placeholder="First Name"
              placeholderTextColor="#FFF"
              onChange={utils.firstNameInput.bind(this)}/>
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
            <TextInput 
              style={[styles.input, styles.whiteFont]}
              placeholder="Last Name"
              placeholderTextColor="#FFF"
              onChange={utils.lastNameInput.bind(this)}/>
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
            <TextInput 
              style={[styles.input, styles.whiteFont]}
              placeholder="Username"
              placeholderTextColor="#FFF"
              onChange={utils.usernameInput.bind(this)}/>
          </View>

          <View style={styles.inputContainer}> 
            <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/> 
            <TextInput
              password={true}
              style={[styles.input, styles.whiteFont]}
              placeholder="Password"
              placeholderTextColor="#FFF"
              onChange={utils.passwordInput.bind(this)}/>
          </View>

        </View>
        <View style={styles.signup}>
          <Text style={styles.whiteFont} onPress={ this.submitSignup.bind(this) }>Sign Up</Text>
        </View>

        <View style={styles.login}>
          <Text style={styles.greyFont}>Already have an account?</Text>
          <TouchableHighlight onPress={ utils.navigateTo.bind(this, 'Login', Login, {}) }>  
            <Text style={styles.whiteFont}>Login</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }

};

module.exports = Signup;





