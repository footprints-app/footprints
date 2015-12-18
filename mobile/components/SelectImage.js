'use strict';
 
var React = require('react-native');
var TourDetail = require('./TourDetail');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var utils = require('../lib/utility');
var CreateTour = require('./CreateTour');
var ViewCreatedTour = require('./ViewCreatedTour');
var styles = require('../lib/stylesheet')

var {
  Image,
  StyleSheet,
  View,
  Text,
  Component,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage,
  ScrollView,
  CameraRoll,
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
      images: [],
      tourId: this.props.tourId || null,
      placeId: this.props.placeId || null,
      selected: '',
      isLoading: true
      // dataSource: new ListView.DataSource({
      //   rowHasChanged: (row1, row2) => row1 !== row2
      // })
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
    CameraRoll.getPhotos(fetchParams, this.storeImages.bind(this), this.logImageError);
  }

  storeImages(data) {
    var assets = data.edges;
    var images = assets.map( asset => asset.node.image );
    this.setState({
        images: images,
    });
  }

  logImageError(err) {
    console.log(err);
  }

  selectImage(image) {
    this.setState({
      selected: image,
    });
    console.log('Selected image: ', image.uri);
  }

  submitSelection() {
    console.log('submit selection');
  }

  render() {
    return (
      <View>
        <ScrollView style={comp_styles.container}>
          <View style={comp_styles.imageGrid}>
            { this.state.images.map((image) => {
                return (
                  <TouchableHighlight key={image.uri} onPress={this.selectImage.bind(this, image)}>
                    <Image style={image === this.state.selected ? comp_styles.selectedImage : comp_styles.image} source={{ uri: image.uri }} />
                  </TouchableHighlight>
                );
              })
            }
          </View>
        </ScrollView>
        <TouchableHighlight
            onPress={ this.submitSelection.bind(this) } 
            style={ styles.touchable } 
            underlayColor="#FF3366">  
            <View style={ comp_styles.submit }>
              <Text style={ styles.whiteFont }>Select Image</Text>
            </View>
        </TouchableHighlight> 
      </View>
    );
  } 
};


var comp_styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 10,
    borderColor: 'black'
  },
  submit: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  }
});
 
module.exports = SelectImage;