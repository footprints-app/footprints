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
  View,
  Text,
  Component,
  TouchableHighlight,
  AsyncStorage,
  NativeModules
 } = React;
 
class SelectImage extends Component {

  /**
   * Creates an instance of SelectImage.
   * Allows the user to select or take a photo. Photo is translated into Base64 and uploaded to the database.
   * @constructor
   * @this {SelectImage}
   */
  constructor(props) {
    super(props);
    this.state = {
      tourId: this.props.tourId || null,
      placeId: this.props.placeId || null,
      addPlaceView: this.props.addPlaceView || false,
      createTourView: this.props.createTourView || false
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

    this.routeToNextComponent();
  }

  routeToNextComponent() {
    if(this.props.createTourView) {
      this.viewTour();
    } else {
      this.viewRecordAudio();
    }
  }

  viewRecordAudio() {
    var RecordAudio = require('./RecordAudio');

    var props = {
      tourId: this.state.tourId,
      placeId: this.state.placeId
    }

    this.props.navigator.push({
      title: "Your Tour",
      component: RecordAudio,
      passProps: props,
      leftButtonTitle: " "
    })
  }

  /**
   * This method is triggered from pressing the skip option from the CreateTour route. It will replace this component
   * with the ViewCreatedTour component.
   */
  viewTour() {
    var ViewCreatedTour = require('./ViewCreatedTour');
    var tourId = this.state.tourId;

    this.props.navigator.push({
      title: "Your Tour",
      component: ViewCreatedTour,
      passProps: {tourId},
      leftButtonTitle: " "
    });
  }
  /**
   * This renders if the previous component is from AddPlace or CreateTour to give the user an option to skip.
   * The AddPlace view will skip to the audio component while the CreateTour view will route to the ViewCreatedTour view.
   * @returns {XML}
	 */
  renderSkipOption () {
    if(this.state.createTourView) {
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
            onPress={ this.routeToNextComponent.bind(this) }
            underlayColor="#727272">
            <View style={ [styles.mainButton, {width: 200, alignItems: 'center', marginBottom: 20}] }>
              <Text style={ styles.whiteFont }>Skip</Text>
            </View>
          </TouchableHighlight>
        </View>
      )
    } else {
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
          onPress={ this.viewRecordAudio.bind(this) }
          underlayColor="#727272">
          <View style={ [styles.mainButton, {width: 200, alignItems: 'center', marginBottom: 20}] }>
            <Text style={ styles.whiteFont }>Skip</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
    }
  }

  render() {
    if(this.state.addPlaceView || this.state.createTourView) {
      return this.renderSkipOption();
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
