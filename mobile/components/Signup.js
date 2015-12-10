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

class Signup extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      rootUrl: 'http://localhost:8000',
      userId: ''
    };
  }

  mainPageView () {
    //if signed up redirect to tours main page
    this.postUserData();

    this.props.navigator.push({
      title: "Tours",
      component: Main
    });
  }

    loginView () {
    //if already have an account
    this.props.navigator.push({
      title: "Login",
      component: Login
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
          <Text style={styles.whiteFont} onPress={ this.mainPageView.bind(this) }>Sign Up</Text>
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

  postUserData () {
    fetch(this.state.rootUrl + '/users/signup', 
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
      this.setState({ userID: responseText.id });
    })
    .catch((error) => {
      console.warn(error);
    });
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





