'use strict';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var React = require('react-native');

var {
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#0097A7',
    // marginTop: 40
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#B2EBF2'
  },
  signupContainer: {
    flex: 1,
    backgroundColor: '#fbda7a'
  },
  loginSignup: {
    backgroundColor: 'transparent',
    padding: 16,
    alignItems: 'center',
    // marginLeft: 25,
    marginBottom: 35,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFF',
    width: 120
  },
  inputIcon: {
    marginLeft: 15,
    width: 20,
    height: 21
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#FFF',
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
  editContainer: {
    height: 20,
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#FFF',
    borderColor: 'transparent'
  },
  editInput: {
    position: 'absolute',
    left: 10,
    top: 1,
    right: 0,
    height: 30,
    fontSize: 12
  },
  whiteFont: {
    color: '#FFF',
    fontFamily: 'Raleway',
    fontSize: 20,
    fontWeight: 'bold'
  },
  goldFont: {
    color: '#FFC107'
  },
  inputs: {
    marginTop: 40,
    flex: 1
  },

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
    flex: .2
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
    flex: 1,
    justifyContent: 'center'
  },
  placeName: {
    fontSize: 14,
    fontFamily: 'OpenSans',
    color: '#FFC107',
    marginBottom: 8,
    marginLeft: 8
  },
  address: {
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
  },
  editIconContainer: { 
    marginLeft: 95,
    marginTop: 75,
  },
  editIcon: { 
    width: 50,
    height: 50,
  },
  photoAudioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: '#00BCD4',
    fontFamily: 'Raleway',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    // marginTop: 25,
  },
  addPlaceIcon: { 
    marginLeft: 12,
    width: 30,
    height: 30,
    marginTop: 20,
  },
  // Start Add Place
  addPlaceContainer: {
    flex: 1,
    backgroundColor: '#727272',
    justifyContent: 'center',
    padding: 20,
  },
  photoAudioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photoContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Raleway',
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FFC107',
    padding: 16,
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFC107',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  photoIcon: { 
    marginLeft: 70,
    width: 50,
    height: 50,
    marginTop: 10,
  },
  audioIcon: { 
    marginLeft: 90,
    width: 50,
    height: 50,
    marginTop: 10,
  },
  // End Add Place
});

module.exports = styles;
