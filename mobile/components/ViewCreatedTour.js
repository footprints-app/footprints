'use strict';

var React = require('react-native');

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

class ViewCreatedTour extends Component {

  render() {
    //console.log('props...', this.props)
    var newTour = this.props.createdTour;
    // console.log('new tour....', newTour)
    // console.log('props...', this.props)

    var tourName = (typeof newTour.tourName !== 'undefined') ? newTour.tourName : '';
    var description = (typeof newTour.description !== 'undefined') ? newTour.description : '';
    var category = (typeof newTour.category !== 'undefined') ? newTour.category : '';
    var duration = (typeof newTour.duration !== 'undefined') ? newTour.duration : '';
    var userName = (typeof newTour.userName !== 'undefined') ? newTour.userName : '';
    var cityName = (typeof newTour.cityName !== 'undefined') ? newTour.cityName : '';
    var state = (typeof newTour.state !== 'undefined') ? newTour.state : '';
    var country = (typeof newTour.country !== 'undefined') ? newTour.country : '';
    
    return (
      <View style={styles.container}>
        <Text style={styles.description}>tourName: {tourName}</Text>
        <Text style={styles.description}>category : {category }</Text>
        <Text style={styles.description}>duration: {duration}</Text>
        <Text style={styles.description}>userName: {userName}</Text>
        <Text style={styles.description}>cityName: {cityName }</Text>
        <Text style={styles.description}>state: {state}</Text>
        <Text style={styles.description}>country: {country}</Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({

  container: {
    marginTop: 75,
    alignItems: 'center'
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
    backgroundColor: '#F5FCFF'
   },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }


});

module.exports = ViewCreatedTour;
