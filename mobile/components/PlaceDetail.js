'use strict';

var React = require('react-native');
var styles = require('../lib/stylesheet');

var {
  StyleSheet,
  Image,
  View,
  Text,
  Component
} = React;

class PlaceDetail extends Component {

   /**
   * Creates an instance of PlaceDetail and sets the state with place details passed from props.
   * 
   * @constructor
   * @param {object} props is the place object from the tour that rendered this PlaceDetail view.
   * @this {PlaceDetail}
   */
  constructor(props) {
    super(props);
    this.state = {
      id: (typeof this.props.place.id !== 'undefined') ? this.props.place.id : '',
      placeName: (typeof this.props.place.placeName !== 'undefined') ? this.props.place.placeName : '',
      image: (typeof this.props.place.image !== 'undefined') ? this.props.place.image : '',
      description: (typeof this.props.place.description !== 'undefined') ? this.props.place.description : '',
      address: (typeof this.props.place.address !== 'undefined') ? this.props.place.address : ''
    };
  }

  render() {
    return (
      <View style={styles.tourContainer}>
        <Image style={styles.headerPhoto} source={{uri: this.state.image}} />
          <Text style={[styles.story, {textAlign: 'center', color: '#00BCD4'}]}> {this.state.placeName}</Text>
        <Text style={[styles.description, {textAlign: 'center'}]}>
        <Text style={styles.bold}>Address:</Text> {this.state.address}
        </Text>
        <Text style={[styles.story, {color: '#FFC107', marginLeft: 10}]}>What's the Story?</Text>
        <Text style={styles.description}>{this.state.description}</Text>
      </View>
    );
  }
};

module.exports = PlaceDetail;
