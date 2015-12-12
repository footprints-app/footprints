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
      validUsername: true
    };
  }

  /**
   * Posts the user details to the server then redirects user to Main Tours page with the userId as a prop for the component
   *
   */
  submitSignup () {
    this.setState({validUsername: true});
    var reqBody = {
      userName: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password
    };

    utils.makeRequest('signup', reqBody)
      .then((response) => {
        if(response.error) {
          this.setState({validUsername: false, firstName: '', lastName: '', username: '', password: ''});
        } else {
          var user = response;
          utils.navigateTo.call(this, "Tours", Main, {user} );
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
              placeholder="First Name"
              placeholderTextColor="#FFF"
              value={this.state.firstName}
              onChange={utils.firstNameInput.bind(this)}/>
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
            <TextInput 
              style={[styles.input, styles.whiteFont]}
              placeholder="Last Name"
              placeholderTextColor="#FFF"
              value={this.state.lastName}
              onChange={utils.lastNameInput.bind(this)}/>
          </View>

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

            <Text style={styles.whiteFont}> {this.state.validUsername ? '' : 'Sorry this username already exists, please try again'} </Text>

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





