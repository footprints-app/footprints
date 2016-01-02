'use strict';

var React = require('react-native');
var PlaceDetail = require('./PlaceDetail');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');
var Mapbox = require('react-native-mapbox-gl');
var mapRef = 'mapRef';
var accessToken = 'pk.eyJ1Ijoicm9jaG5lc3MiLCJhIjoiY2lpdXp6ejRpMDAyaXUza210ZjU0ZHE3ZCJ9.0OwepqZxbN_IlHDppY18_w';

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
      annotations: [{
        coordinates: [37.7614399, -122.4240539],
        'type': 'point',
        title: 'Tartine Bakery',
        subtitle: 'Yum!',
        rightCalloutAccessory: {
          url: 'https://cldup.com/9Lp0EaBw5s.png',
          height: 25,
          width: 25
        },
        annotationImage: {
          url: 'https://cldup.com/CnRLZem9k9.png',
          height: 25,
          width: 25
        },
        id: 'marker1'}, 
      ]
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
        places: response.places;
      });
      this.createMakers(places);
    })
    .done();
  },

  /**
   * Creates a map marker for each place in the tour and sets the marker in the state.
   * @param {array} places is the array of place objects in the tour.
   */
  createMarkers(places) {
    var markers = [];
    places.forEach(function(place) {
      var parsedAddress = place.address.split('|');
      var lat = parsedAddress[1];
      var lng = parsedAddress[2];
      markers.push({
        coordinates: [lat, lng],
        'type': 'point',
        title: place.placeName,
        subtitle: 'Stop # ' + place.placeOrder,
        rightCalloutAccessory: {
          url: 'https://cldup.com/9Lp0EaBw5s.png',
          height: 25,
          width: 25
        },
        annotationImage: {
          url: 'https://cldup.com/CnRLZem9k9.png',
          height: 25,
          width: 25
        }
      });
    });
    this.setState({annotations: markers});
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
    console.log(e);
  },
  onLongPress(location) {
    console.log('long pressed', location);
  },


  // renderPlace(place) {
  //   var imageURI = (typeof place.image !== 'undefined') ? place.image : null;
  //   return (
  //     <TouchableHighlight onPress={ utils.navigateTo.bind(this,place.placeName, PlaceDetail, {place}) }  underlayColor='#dddddd'>
  //       <View>
  //         {/*<View style={styles.tourSeparator} />*/}
  //         <View style={ styles.placeContainer }>
  //           <Image source={{ uri: imageURI }} style={ styles.thumbnail }  />
  //           <View style={ styles.rightContainer }>
  //             <Text style={ styles.placeName }>{ place.placeName }</Text>
  //           </View>
  //           <Image source={ require('../assets/arrow.png') } style={ styles.arrow }></Image>
  //         </View>
  //         <View style={ styles.tourSeparator } />
  //       </View>
  //     </TouchableHighlight>
  //   );
  // }
  
  render: function () {
    return (
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
          styleURL={this.mapStyles.streets}
          userTrackingMode={this.userTrackingMode.none}
          centerCoordinate={this.state.center}
          zoomLevel={this.state.zoom}
          onRegionChange={this.onRegionChange}
          onRegionWillChange={this.onRegionWillChange}
          annotations={this.state.annotations}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress} />
      </View>
    );
  }
});

var mapStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  text: {
    padding: 3
  }
});
      // <View style={styles.tourContainer}>
      //    <MapView
      //     style={styles.map}
      //     onRegionChange={this._onRegionChange}
      //     onRegionChangeComplete={this._onRegionChangeComplete}
      //     region={this.state.mapRegion}
      //     annotations={this.state.annotations}/>
      // </View>
      //   <ScrollView automaticallyAdjustContentInsets={false}>

      //     <Text style={ [styles.tourTitle] }>{ tourName }</Text>
      //     <Text style={ [styles.description, {marginRight: 10}] }>
      //       <Text style={ styles.bold }>Description:</Text> { description + '\n' }
      //       <Text style={ styles.bold }>City:</Text> { cityName + '\n' }
      //       {/*<Text style={styles.bold}>Category:</Text> {category + '\n'}*/}
      //       <Text style={ styles.bold }>Est Time:</Text> { duration + ' hours'}
      //     </Text>
      //     <Text style={ styles.tourTitle }>Places</Text>
      //     <View style={ styles.tourSeparator } />
          
      //     <View style={ styles.panel }>
      //       <ListView
      //         dataSource={ this.state.dataSource }
      //         renderRow={ this.renderPlace.bind(this) }
      //         style={ styles.listView }
      //         automaticallyAdjustContentInsets={false} />
      //     </View>

      //   </ScrollView>
      // </View>

module.exports = TourDetail;
