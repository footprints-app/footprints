'use strict';

var React = require('react-native');
var PlaceDetail = require('./PlaceDetail');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');
var Mapbox = require('react-native-mapbox-gl');
var mapRef = 'mapRef';
var accessToken = 'pk.eyJ1Ijoicm9jaG5lc3MiLCJhIjoiY2lpdXp6ejRpMDAyaXUza210ZjU0ZHE3ZCJ9.0OwepqZxbN_IlHDppY18_w';
var imageUrlPath = 'http://res.cloudinary.com/terrifying-veg/image/upload/v1451697830/mapIcons/number_';
var {
  Image,
  View,
  Text,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView,
  StyleSheet,
  StatusBarIOS
} = React;

var TourDetail = React.createClass({
    mixins: [Mapbox.Mixin],


  /**
   * Creates an instance of TourDetail and sets the state with the tourId passed from props.
   * 
   * @constructor
   * @param {object} props is the tour object that was selected.
   * @this {TourDetail}
   */
  // constructor(props) {
    // super(props);
  getInitialState() {
    return {
      isLoading: true,
      tourId: this.props.tour.id,
      tour: this.props.tour,
      places: [],
      cityName: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),

      center: {
        latitude: 37.7614399,
        longitude: -122.4240539
      },
      zoom: 13,
      annotations: []
    };
  },

  componentDidMount() {
    this.fetchData();
  },

  /**
   * Makes GET request to server for specifc tour and sets the places array from DB to the state.
   *
   */
  fetchData() {
    var component = this;
    var options = {
      reqBody: {},
      reqParam: this.state.tourId
    }; 

    utils.makeRequest('tour', component, options)
    .then((response) => {
      console.log('response body from TourDetail: ', response);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.places),
        isLoading: false,
        cityName: response.cityName,
        places: response.places
      });
      if(this.state.places.length === 0) {
        //set center to city coords
      } else {
        this.createMarkers(this.state.places);
      }
    })
    .done();
  },

  /**
   * Creates a map marker for each place in the tour and sets the marker in the state, also sets to center to the midpoint of all places.
   * @param {array} places is the array of place objects in the tour.
   */
  createMarkers(places) {
    var markers = [];
    var latSum = 0;
    var lngSum = 0;
    // var polyLineCoords = [];
    places.forEach(function(place) {
      var parsedAddress = place.address.split('|');
      var lat = Number(parsedAddress[1]);
      var lng = Number(parsedAddress[2]);
      latSum += lat;
      lngSum += lng;
      // polyLineCoords.push([lat, lng]);
      markers.push({
        coordinates: [lat, lng],
        'type': 'point',
        title: place.placeName,
        subtitle: 'Stop #' + place.placeOrder,
        rightCalloutAccessory: {
          url: 'http://res.cloudinary.com/terrifying-veg/image/upload/v1451697830/mapIcons/number_1.png',
          height: 25,
          width: 25
        },
        annotationImage: {
          url: imageUrlPath + place.placeOrder.toString() + '.png',
          height: 25,
          width: 25
        },
        id: 'marker' + place.id
      });
    });
    this.setState({annotations: markers, center: {latitude: latSum/places.length, longitude: lngSum/places.length}});
  },

  onRegionChange(location) {
    this.setState({ currentZoom: location.zoom });
  },
  onRegionWillChange(location) {
    console.log(location);
  },
  onUpdateUserLocation(location) {
    console.log(location);
  },
  onOpenAnnotation(annotation) {
    console.log(annotation);
  },
  onRightAnnotationTapped(e) {
    // e: {id: "marker54", title: "Zeitgeist", latitude: 37.7700304, subtitle: "Stop # 7", longitude: -122.4221087}
    console.log('right button ', e);
  },
  onLongPress(location) {
    console.log('long pressed', location);
  },


  renderPlace(place) {
    var imageURI = (typeof place.image !== 'undefined') ? place.image : null;
    return (
      <TouchableHighlight onPress={ utils.navigateTo.bind(this,place.placeName, PlaceDetail, {place}) }  underlayColor='#dddddd'>
        <View>
          {/*<View style={styles.tourSeparator} />*/}
          <View style={ styles.placeContainer }>
            <Image source={{ uri: imageURI }} style={ styles.thumbnail }  />
            <View style={ styles.rightContainer }>
              <Text style={ styles.placeName }>{ place.placeOrder + ' | ' + place.placeName }</Text>
              <Text style={ styles.address }>{ place.address.split(',')[0] }</Text>
            </View>
            <Image source={ require('../assets/arrow.png') } style={ styles.arrow }></Image>
          </View>
          <View style={ styles.tourSeparator } />
        </View>
      </TouchableHighlight>
    );
  },
  
  render: function () {
    return (
      <View style={styles.tourContainer}>
        <View style={mapStyles.container}>
          <Mapbox
            style={mapStyles.map}
            direction={0}
            rotateEnabled={true}
            scrollEnabled={true}
            zoomEnabled={true}
            showsUserLocation={true}
            ref={mapRef}
            accessToken={'pk.eyJ1Ijoicm9jaG5lc3MiLCJhIjoiY2lpdXp6ejRpMDAyaXUza210ZjU0ZHE3ZCJ9.0OwepqZxbN_IlHDppY18_w'}
            styleURL={this.mapStyles.emerald}
            userTrackingMode={this.userTrackingMode.follow}
            centerCoordinate={this.state.center}
            zoomLevel={this.state.zoom}
            logoIsHidden={true}
            onRegionChange={this.onRegionChange}
            onRegionWillChange={this.onRegionWillChange}
            annotations={this.state.annotations}
            onOpenAnnotation={this.onOpenAnnotation}
            onRightAnnotationTapped={this.onRightAnnotationTapped}
            onUpdateUserLocation={this.onUpdateUserLocation}
            onLongPress={this.onLongPress} />
        </View>
        <ScrollView automaticallyAdjustContentInsets={false}>
          <Text style={ [styles.tourTitle] }>{ this.state.tourName }</Text>
          <Text style={ [styles.description, {marginRight: 10}] }>
            <Text style={ styles.bold }>Description:</Text> { this.state.tour.description + '\n' }
            <Text style={ styles.bold }>City:</Text> { this.state.tour.cityName + '\n' }
            {/*<Text style={styles.bold}>Category:</Text> {category + '\n'}*/}
            <Text style={ styles.bold }>Est Time:</Text> { this.state.tour.duration + ' hours (' + this.state.places.length + ' stops)'}
          </Text>
          <Text style={ styles.tourTitle }>Places</Text>
          <View style={ styles.tourSeparator } />
          <View style={ styles.panel }>
            <ListView
              dataSource={ this.state.dataSource }
              renderRow={ this.renderPlace }
              style={ styles.listView }
              automaticallyAdjustContentInsets={false} />
          </View>
        </ScrollView>
      </View>
    );
  }
});

var mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300
  },
  map: {
    flex: 1
  },
  text: {
    padding: 3
  }
});

module.exports = TourDetail;
