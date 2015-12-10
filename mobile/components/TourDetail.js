'use strict';

var React = require('react-native');
var PlaceDetail = require('./PlaceDetail');

var {
  StyleSheet,
  Image,
  View,
  Text,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

class TourDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    var places = this.props.tour.places;
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(places) });
    //this.fetchData();
  }

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS
          size='large'/>
        <Text>
          Loading tours...
        </Text>
      </View>
    );
  }

  showPlaceDetail(place) {
    console.log(this.props)
    this.props.navigator.push({
      title: place.placeName,
      component: PlaceDetail,
      passProps: {place}
    });
    console.log(this.props)
  }

  renderPlace(place) {
    return (
      <TouchableHighlight onPress={ () => this.showPlaceDetail(place)}  underlayColor='#dddddd'>
        <View>
          <View style={styles.placeContainer}>
            <View style={styles.rightContainer}>
              <Text style={styles.placeName}>{place.placeName}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }
  
  render() {
    //console.log('props...', this.props)
    var tour = this.props.tour;
    // console.log('tour....', tour)
    var imageURI = (typeof tour.image !== 'undefined') ? tour.image : '';
    var description = (typeof tour.description !== 'undefined') ? tour.description : '';
    var cityName = (typeof tour.cityName !== 'undefined') ? tour.cityName : '';
    var category = (typeof tour.category !== 'undefined') ? tour.category : '';
    var duration = (typeof tour.duration !== 'undefined') ? tour.duration : '';
    
    return (
      <View style={styles.container}>
        
        <Image style={styles.image} source={{uri: imageURI}} />
        <Text style={styles.description}>description: {description}</Text>
        <Text style={styles.description}>City: {cityName}</Text>
        <Text style={styles.description}>Category: {category}</Text>
        <Text style={styles.description}>Duration: {duration}</Text>
        <Text style={styles.description}>Places</Text>
        
        <View style={styles.panel}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderPlace.bind(this)}
            style={styles.listView}/>
        </View>
      </View>
      
    );

  }
};

var styles = StyleSheet.create({

  container: {
    marginTop: 75,
    flex: 1,
    padding: 10,
    marginLeft: 3
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  panel: {
    backgroundColor: '#fff2f2',
    flex: 1,
    // marginTop: -50,
    padding: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    
  },
  placeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff2f2',
    padding: 10
  },
  image: {
    width: 350,
    height: 165,
    padding: 10
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565',
  },
  thumbnail: {
    width: 85,
    height: 81,
    marginRight: 10,
    marginTop: 10
  },
  rightContainer: {
    flex: 1
  },
  placeName: {
    fontSize: 14,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 20
  },
  city: {
    color: '#656565',
    marginLeft: 20
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  listView: {
    backgroundColor: '#fff2f2'
   },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }


});

module.exports = TourDetail;





