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

class PlaceDetail extends Component {

  render() {
    //console.log('props...', this.props)
    var places = this.props.place
    //console.log('tour....', tour)
    //console.log('props...', this.props)
    var imageURI = (typeof places.image !== 'undefined') ? places.image : '';
    var description = (typeof places.description !== 'undefined') ? places.description : '';
    var placeName = (typeof places.placeName !== 'undefined') ? places.placeName : '';
    var address = (typeof places.address !== 'undefined') ? places.address : '';
    
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imageURI}} />
        <Text style={styles.description}>Location: {placeName}</Text>
        <Text style={styles.description}>Address: {address}</Text>
        <Text style={styles.description}>description: {description}</Text>
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

module.exports = PlaceDetail;
