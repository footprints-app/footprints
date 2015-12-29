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
  Image,
  StyleSheet,
  View,
  Text,
  Component,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage,
  CameraRoll,
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
      selected: '',
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

  launchCamera () {
    var options = {
      title: 'Select a Tour Photo',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      //maxWidth: 200,
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
        console.log('image picker res:', response)
        this.submitSelection(response.data.toString())

        if (response.takePhotoButtonTitle) {
          UIImagePickerManager.launchCamera(options, (didCancel, response)  => {
            this.submitSelection(response.data.toString())
          });
        }
      }
    });
  }


  submitSelection(encodedData) {
    var props = {
      tourId: this.state.tourId,
      editMode: true
    };

    console.log('submit selection', props)
    var options = {
      reqParam: this.state.tourId,
      reqBody: {
        encodedData: encodedData
      }
    };

    var reqType = 'addTourPhoto';
    var component = this;
    if(this.state.placeId !== null) {
      console.log('PLACE PHOTO');
      reqType = 'addPlacePhoto'
      options.reqParam = this.state.placeId
    }
    console.log('submit selection');
      utils.makeRequest(reqType, component, options)
      .then(response => {
        console.log('tour added to db: ', response);
      })

    var ViewCreatedTour = require('./ViewCreatedTour')
    this.props.navigator.replace({
      title: "Your Tour",
      component: ViewCreatedTour,
      passProps: props
    });
  }

  render() {
    return (
      <View style={comp_styles.uploadContainer}>
        <TouchableHighlight
            onPress={ this.launchCamera.bind(this) }>
            <View style={ comp_styles.selectImage }>
              <Text style={ styles.whiteFont }>Select Image</Text>
            </View>
        </TouchableHighlight>
      </View>
    );
  } 
};


var comp_styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
    backgroundColor: '#727272',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectImage: {
    backgroundColor: '#FFC107',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  }
});
 
module.exports = SelectImage;