'use strict';
 
var React = require('react-native');
var TourDetail = require('./TourDetail');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var utils = require('../lib/utility');
var CreateTour = require('./CreateTour');
var ViewCreatedTour = require('./ViewCreatedTour');

var {
  Image,
  StyleSheet,
  View,
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

  selectImage(uri) {
    this.setState({
      selected: uri,
    });
    console.log('Selected image: ', uri);
  },


render() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageGrid}>
            { this.state.images.map(image => <Image style={styles.image} source={{ uri: image.uri }} />) }
            </View>
        </ScrollView>
    );
  } 
};

var styles = StyleSheet.create({
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
  }
});
 
module.exports = SelectImage;