'use strict';
 
var React = require('react-native');
var TourDetail = require('./TourDetail');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var utils = require('../lib/utility');
var CreateTour = require('./CreateTour');
var styles = require('../lib/stylesheet');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

var {
  StyleSheet,
  View,
  Text,
  Component,
  TouchableHighlight,
  AsyncStorage,
  NativeModules
 } = React;
 
class SelectImage extends Component {

  /**
   * Creates an instance of MyTours.
   * The DataSource is an interface that ListView uses to determine which rows have changed over the course of updates. ES6 constructor is an analog of getInitialState.
   * @constructor
   * @this {MyTours}
   */
  
  constructor(props) {
    super(props);
    this.state = {
      tourId: this.props.tourId || null,
      placeId: this.props.placeId || null,
      addPlaceView: this.props.addPlaceView || false,
      isLoading: true
    };
  }

  /**
   * ComponentDidMount function is called as soon as the render method is executed.
   * It fetches data from the database and sets the state with the fetched data.
   */

  componentDidMount () {

    /* Use this code to make actual API request to fetch data from database */
    var that = this;
    AsyncStorage.multiGet(['token', 'user'])
      .then(function(data) {
        if(data) {
          that.setState({
            token: data[0][1],
            userId: +data[1][1]
          });
        }
        that.fetchData()
      });

      var fetchParams = {
          first: 25,
      };
  }

  /**
   * This method is triggered when "Select Image" is pressed. It will launch an option to choose from
   * library or take a new photo utilizing a react-native module called UIImagePicker
   */
  launchCamera () {
    var options = {
      title: 'Select a Tour Photo',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      maxHeight: 500,
      quality: 1,
      allowsEditing: true,
      noData: false,
      storageOptions: {
        skipBackup: true
      }
    };

    UIImagePickerManager.showImagePicker(options, (didCancel, response)  => {
      if(!didCancel) {
        this.submitSelection(response.data.toString())

        if (response.takePhotoButtonTitle) {
          UIImagePickerManager.launchCamera(options, (didCancel, response)  => {
            this.submitSelection(response.data.toString())
          });
        }
      }
    });
  }

  /**
   * This method is triggered when a photo is selected or taken. It makes a post request to either tours/tourphoto
   * or tours/placephoto depending on the state. After post request has been made, navigator will route back to
   * ViewCreatedTour view.
   * @param encodedData - Base 64 encoding passed in from the UIImagePicker module
	 */
  submitSelection(encodedData) {
    var ViewCreatedTour = require('./ViewCreatedTour')
    var reqType = 'addTourPhoto';
    var component = this;
    var props = {
      tourId: this.state.tourId,
      editMode: true
    };
    var options = {
      reqParam: this.state.tourId,
      reqBody: {
        encodedData: encodedData
      }
    };

    if(this.state.placeId !== null) {
      reqType = 'addPlacePhoto'
      options.reqParam = this.state.placeId
    }

      utils.makeRequest(reqType, component, options)
      .then(response => {
        console.log('tour added to db: ', response);
      })

    this.props.navigator.replace({
      title: "Your Tour",
      component: ViewCreatedTour,
      passProps: props
    });
  }

  /**
   * This renders if the previous component is from AddPlace to give the user an option to skip
   * @returns {XML}
	 */
  renderAddPlacePhoto () {
    return (
      <View style={ [styles.mainContainer, {marginTop: 0}]}>
        <TouchableHighlight
          onPress={ this.launchCamera.bind(this) }
          underlayColor="#727272">
          <View style={ [styles.mainButton, {width: 200, alignItems: 'center', marginBottom: 20}] }>
            <Text style={ styles.whiteFont }>Select Image</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={ () => alert('going to audio')}
          underlayColor="#727272">
          <View style={ [styles.mainButton, {width: 200, alignItems: 'center', marginBottom: 20}] }>
            <Text style={ styles.whiteFont }>Skip</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    if(this.state.addPlaceView) {
      return this.renderAddPlacePhoto();
    } else {
      return (
        <View style={ [styles.mainContainer, {marginTop: 0}] }>
          <TouchableHighlight
            onPress={ this.launchCamera.bind(this) }
            underlayColor="#727272">
            <View style={ [styles.mainButton, {width: 200, alignItems: 'center', marginBottom: 20}] }>
              <Text style={ styles.whiteFont }>Select Image</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  } 
};
 
module.exports = SelectImage;