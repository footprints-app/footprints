'use strict';

var React = require('react-native');
var PlaceDetail = require('./PlaceDetail');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');
var Mapbox = require('react-native-mapbox-gl');
var mapRef = 'mapRef';

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
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      center: {
        latitude: 40.72052634,
        longitude: -73.97686958312988
      },
      zoom: 11,
      annotations: [{
        coordinates: [40.72052634, -73.97686958312988],
        'type': 'point',
        title: 'This is marker 1',
        subtitle: 'It has a rightCalloutAccessory too',
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
        {
        coordinates: [40.714541341726175,-74.00579452514648],
        'type': 'point',
        title: 'Important!',
        subtitle: 'Neat, this is a custom annotation image',
        annotationImage: {
          url: 'https://cldup.com/7NLZklp8zS.png',
          height: 25,
          width: 25
        },
        id: 'marker2'
      }, {
        'coordinates': [[40.76572150042782,-73.99429321289062],[40.743485405490695, -74.00218963623047],[40.728266950429735,-74.00218963623047],[40.728266950429735,-73.99154663085938],[40.73633186448861,-73.98983001708984],[40.74465591168391,-73.98914337158203],[40.749337730454826,-73.9870834350586]],
        'type': 'polyline',
        'strokeColor': '#00FB00',
        'strokeWidth': 4,
        'strokeAlpha': .5,
        'id': 'foobar'
      }, {
        'coordinates': [[40.749857912194386, -73.96820068359375], [40.741924698522055,-73.9735221862793], [40.735681504432264,-73.97523880004883], [40.7315190495212,-73.97438049316406], [40.729177554196376,-73.97180557250975], [40.72345355209305,-73.97438049316406], [40.719290332250544,-73.97455215454102], [40.71369559554873,-73.97729873657227], [40.71200407096382,-73.97850036621094], [40.71031250340588,-73.98691177368163], [40.71031250340588,-73.99154663085938]],
        'type': 'polygon',
        'fillAlpha':1,
        'strokeColor': '#fffff',
        'fillColor': 'blue',
        'id': 'zap'
      }]
    };
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

  // componentDidMount() {
  //   this.fetchData();
  // }


  /**
   * Makes GET request to server for specifc tour and sets the places array from DB to the state.
   *
   */
  // fetchData() {
  //   var component = this;
  //   var options = {
  //     reqBody: {},
  //     reqParam: this.state.tourId
  //   }; 

  //   utils.makeRequest('tour', component, options)
  //   .then((response) => {
  //     console.log('response body from TourDetail: ', response);
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(response.places),
  //       isLoading: false
  //     });
  //   })
  //   .done();
  // }


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
              <Text style={styles.text} onPress={() => this.setDirectionAnimated(mapRef, 0)}>
          Set direction to 0
        </Text>
        <Text style={styles.text} onPress={() => this.setZoomLevelAnimated(mapRef, 6)}>
          Zoom out to zoom level 6
        </Text>
        <Text style={styles.text} onPress={() => this.setCenterCoordinateAnimated(mapRef, 48.8589, 2.3447)}>
          Go to Paris at current zoom level {parseInt(this.state.currentZoom)}
        </Text>
        <Text style={styles.text} onPress={() => this.setCenterCoordinateZoomLevelAnimated(mapRef, 35.68829, 139.77492, 14)}>
          Go to Tokyo at fixed zoom level 14
        </Text>
        <Text style={styles.text} onPress={() => this.addAnnotations(mapRef, [{
          coordinates: [40.73312,-73.989],
          type: 'point',
          title: 'This is a new marker',
          id: 'foo'
        }, {
          'coordinates': [[40.749857912194386, -73.96820068359375], [40.741924698522055,-73.9735221862793], [40.735681504432264,-73.97523880004883], [40.7315190495212,-73.97438049316406], [40.729177554196376,-73.97180557250975], [40.72345355209305,-73.97438049316406], [40.719290332250544,-73.97455215454102], [40.71369559554873,-73.97729873657227], [40.71200407096382,-73.97850036621094], [40.71031250340588,-73.98691177368163], [40.71031250340588,-73.99154663085938]],
          'type': 'polygon',
          'fillAlpha': 1,
          'fillColor': '#000',
          'strokeAlpha': 1,
          'id': 'new-black-polygon'
        }])}>
          Add new marker
        </Text>
        <Text style={styles.text} onPress={() => this.selectAnnotationAnimated(mapRef, 'marker1')}>
          Open marker1 popup
        </Text>
        <Text style={styles.text} onPress={() => this.removeAnnotation(mapRef, 'marker2')}>
          Remove marker2 annotation
        </Text>
        <Text style={styles.text} onPress={() => this.removeAllAnnotations(mapRef)}>
          Remove all annotations
        </Text>
        <Text style={styles.text} onPress={() => this.setVisibleCoordinateBoundsAnimated(mapRef, 40.712, -74.227, 40.774, -74.125, 100, 0, 0, 0)}>
          Set visible bounds to 40.7, -74.2, 40.7, -74.1
        </Text>
        <Text style={styles.text} onPress={() => this.setUserTrackingMode(mapRef, this.userTrackingMode.follow)}>
          Set userTrackingMode to follow
        </Text>
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
