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
    width: 280,
    backgroundColor: '#FCC107',
    borderRadius: 20,
    justifyContent:'center'
  },
  mainButtonBottom: {
    marginTop: 55,
  },
  mainButtonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  mainTouchable: {
    borderRadius: 100
  },
  //End Main.js

  //ToursView Styling
  tourPhoto: {
    backgroundColor: 'transparent',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Raleway',
    fontWeight: '800',
    paddingTop: 10
  },
  city: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontWeight: '800',
    fontSize: 16
  },
  separator: {
    height: 3,
    backgroundColor: '#FFF'
  },
  listView: {
    flex: 1,
    backgroundColor: '#727272'
  },
  createTour: {
    backgroundColor: '#FFC107',
    padding: 20,
    alignItems: 'center'
  },
  createBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginBottom: 50,
  },
  deleteContainer: {
    flex: 1
  },
  deleteText: {
    fontSize: 12,
    marginBottom: 8
  },
  doneBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginBottom: 50,
  },
  editBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginBottom: 25
  },
  //Tour Detail
  tourContainer: {
    flex: 1,
    backgroundColor: '#727272'
  },
  panel: {
    backgroundColor: '#727272',
    flex: 1
  },
  placeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerPhoto: {
    marginTop: 60,
    backgroundColor: 'transparent',
    height: 150
  },
  description: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'OpenSans',
    marginLeft: 12
  },
  thumbnail: {
    width: 85,
    height: 81
  },
  rightContainer: {
    flex: 1
  },
  placeName: {
    fontSize: 14,
    fontFamily: 'OpenSans',
    color: '#FFF',
    marginBottom: 8,
    marginLeft: 8
  },
  tourTitle: {
    fontSize: 25,
    fontFamily: 'Raleway',
    fontWeight: '500',
    color: '#00BCD4',
    marginLeft: 10,
    marginBottom: 8,
    marginTop: 13,
    justifyContent: 'center'
  },
  bold: {
    fontWeight: 'bold'
  },
  tourSeparator: {
    height: 1,
    backgroundColor: '#FFF'
  },
  arrow: {
    marginRight: 7
  },

  //PlaceDetail
  detailContainer: {
    alignItems: 'center',
    marginTop: 75
  },
  story: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15
  }
});

module.exports = styles;
