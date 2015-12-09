'use strict';

var React = require('react-native');
// var PlaceDetail = require('./PlaceDetail');

var {
  StyleSheet,
  Image,
  View,
  Text,
  Component
} = React;

class TourDetail extends Component {
  
  render() {
    //console.log('props...', this.props)
    var tour = this.props.tour;
    console.log('tour....', tour)
    var imageURI = (typeof tour.tourInfo.imageLinks !== 'undefined') ? tour.tourInfo.imageLinks.thumbnail : '';
    var description = (typeof tour.tourInfo.description !== 'undefined') ? tour.tourInfo.description : '';
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imageURI}} />
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({

  container: {
    marginTop: 75,
    alignItems: 'center'
  },
  image: {
    width: 107,
    height: 165,
    padding: 10
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565'
  }

});

module.exports = TourDetail;





