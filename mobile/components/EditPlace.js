'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Image,
  View,
  Text,
  Component,
  Listview,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

class EditPlace extends Component {
   /**
   * Creates an instance of EditPlace and sets the state with place details passed from props.
   * Allows for editing of a place's details and submits a PUT request when done button is clicked.
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
    console.log('Edit place reached');
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.state.image}} />
        <Text style={styles.description}>Location: {this.state.placeName}</Text>
        <Text style={styles.description}>Address: {this.state.address}</Text>
        <Text style={styles.description}>description: {this.state.description}</Text>
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

module.exports = EditPlace;

