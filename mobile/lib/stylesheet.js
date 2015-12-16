'use strict';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var React = require('react-native');

var {
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  //Start Shared Styles login-signup
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
  signin: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: -75
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
  greyFont: {
    color: '#D8D8D8'
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
  whiteFont: {
    color: '#FFF'
  },
  touchable: {
    borderRadius: 5
  },
  //End Shared Styles

  //Login.js Styles  
  loginSignup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15
  },
  loginInputs: {
    marginTop: 300,
    marginBottom: 10,
    flex: .25
  },
  //End of Login.js Styles

  //Start SignUp.js  
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
  signupInputs: {
    marginTop: 200,
    marginBottom: 10,
    flex: .25
  },  
  //End SignUp.js

  //Start Main.js
  mainContainer: {
    marginTop: 65,
    backgroundColor: '#727272',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  mainButton: {
    height: 80,
    width: 250,
    backgroundColor: '#FCC107',
    borderRadius: 20,
    justifyContent:'center'
  },
  mainButtonBottom: {
    marginTop: 25,
  },
  mainButtonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  mainTouchable: {
    borderRadius: 100
  }
  //End Main.js

})

module.exports = styles;
