'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var utils = require('../lib/utility');

var Main = require('./Main');
// var Signup = require('./Signup');

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
      userId: ''
    };
  }

  /**
   * This function can not be extracted/replaced with a utils function?
  */
  // signupPage () {
  //   var Signup = require('./Signup');
  //     this.props.navigator.push({
  //     title: "Signup",
  //     component: Signup,
  //     // passProps: {username: this.state.username, password: this.state.password},
  //   });

  // }


  /**
   * Posts the user login details to the server for verification, then redirects user to Main Tours page with successful login.
   *
   */
  submitLogin () {
    fetch(utils.request_url + '/users/login', 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: this.state.username,
          password: this.state.password
        })
      }
    ).then((response) => response.text())
    .then((responseText) => {
      // res.body: {id: <int>, userName: <string>, firstName: <string>, lastName: <string>}
      if(responseText.error) {
      /*
        need to handle incorrect login details
      */
      } else {
        utils.navigateTo.call(this, "Welcome", Main, {responseText});
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
        
        <View style={styles.inputs}>
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

        <TouchableHighlight onPress={ this.submitLogin.bind(this) } style={styles.touchable} underlayColor="#FF3366">  
          <View style={styles.signin}>
            <Text style={styles.whiteFont}>Login</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.signup}>
          <Text style={styles.greyFont}>Do not have an account?</Text>
          <TouchableHighlight onPress={ utils.navigateTo.bind(this, 'Signup', require('./Signup'), {}) }>  
            <Text style={styles.whiteFont}>Sign Up</Text>
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
  signin: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: -75
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15
  },
  inputs: {
    marginTop: 300,
    marginBottom: 10,
    flex: .25
  },
  inputPassword: {
    marginLeft: 15,
    width: 20,
    height: 21
  },
  inputUsername: {
    marginLeft: 15,
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
  },
  button: {
    height: 15,
    width: 75,
    flex: 0.01,
    alignItems: 'center',
    backgroundColor: "#555555",
    borderColor: "#555555",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: "center"
  },
  touchable: {
    borderRadius: 5
  }
});

module.exports = Login;





