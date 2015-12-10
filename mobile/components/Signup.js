'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Login = require('./Login');
var Main = require('./Main');

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

var REQUEST_URL = 'http://localhost:8000';

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
   * Redirects user to the login page when 'Already have an account?' is clicked.
   *
   */
  loginView () {
    this.props.navigator.push({
      title: "Login",
      component: Login
    });
  }

  firstNameInput(event) {
    this.setState({ firstName: event.nativeEvent.text });
  }

  lastNameInput(event) {
    this.setState({ lastName: event.nativeEvent.text });
  }
  usernameInput(event) {
    this.setState({ username: event.nativeEvent.text });
  }

  passwordInput(event) {
    this.setState({ password: event.nativeEvent.text });
  }

  /**
   * Posts the user details to the server then redirects user to Main Tours page with the userId as a prop for the component
   *
   */
  submitSignup () {
    fetch(REQUEST_URL + '/users/signup', 
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
    // res.body: {id: <int>, userName: <string>, firstName: <string>, lastName: <string>}
      var userId = responseText.id;
      this.props.navigator.push({
        title: "Tours",
        component: Main,
        passProps: {userId}
      });
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
              onChange={this.firstNameInput.bind(this)}/>
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
            <TextInput 
              style={[styles.input, styles.whiteFont]}
              placeholder="Last Name"
              placeholderTextColor="#FFF"
              onChange={this.lastNameInput.bind(this)}/>
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
            <TextInput 
              style={[styles.input, styles.whiteFont]}
              placeholder="Username"
              placeholderTextColor="#FFF"
              onChange={this.usernameInput.bind(this)}/>
          </View>

          <View style={styles.inputContainer}> 
            <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/> 
            <TextInput
              password={true}
              style={[styles.input, styles.whiteFont]}
              placeholder="Password"
              placeholderTextColor="#FFF"
              onChange={this.passwordInput.bind(this)}/>
          </View>

        </View>
        <View style={styles.signup}>
          <Text style={styles.whiteFont} onPress={ this.submitSignup.bind(this) }>Sign Up</Text>
        </View>

        <View style={styles.login}>
          <Text style={styles.greyFont}>Already have an account?</Text>
          <TouchableHighlight onPress={ this.loginView.bind(this) }>  
            <Text style={styles.whiteFont}>Login</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }

};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },
  bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: windowSize.width,
      height: windowSize.height
  },
  header: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .5,
      backgroundColor: 'transparent'
  },
  mark: {
      width: 150,
      height: 150
  },
  signup: {
      backgroundColor: '#FF3366',
      padding: 20,
      alignItems: 'center',
      marginTop: -8.5
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15
  },
  inputs: {
      marginTop: 200,
      marginBottom: 10,
      flex: .25
  },
  inputPassword: {
      marginLeft: 10,
      width: 20,
      height: 21
  },
  inputUsername: {
    marginLeft: 10,
    width: 20,
    height: 20
  },
  inputContainer: {
      padding: 10,
      borderWidth: 1,
      borderBottomColor: '#CCC',
      borderColor: 'transparent'
  },
  input: {
      position: 'absolute',
      left: 61,
      top: 12,
      right: 0,
      height: 20,
      fontSize: 14
  },
  forgotContainer: {
    alignItems: 'flex-end',
    padding: 15,
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  }
})
module.exports = Signup;





