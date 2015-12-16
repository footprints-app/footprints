'use strict';

var React = require('react-native');
var utils = require('../lib/utility');


var {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
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
      address: (typeof this.props.place.address !== 'undefined') ? this.props.place.address : '',
      editId: '',
      editPlaceName: '',
      editImage: '',
      editDescription: '',
      editAddress: ''
    };
   }

   editDone() {

   }

   render() {
 
    return (

      <View style={styles.container}>

        <Image style={styles.image} source={{uri: this.state.image}} />
        
        <View style={ styles.inputs }>
        
          <View style={ styles.inputContainer }>
            <TextInput
              style={ [styles.input] }
              placeholder={ this.state.placeName }
              placeholderTextColor="black"
              value={ this.state.placeName }
              onChange={ utils.tourNameInput.bind(this) }/>              
          </View>

          <View style={ styles.inputContainer }>
            <TextInput
              style={ [styles.input] }
              placeholder={ this.state.address }
              placeholderTextColor="black"
              value={ this.state.address }
              onChange={ utils.tourNameInput.bind(this) }/>              
          </View>
          
          <View style={ styles.inputContainer }>
            <TextInput
              style={ [styles.input] }
              placeholder={ this.state.description }
              placeholderTextColor="black"
              value={ this.state.description }
              onChange={ utils.tourNameInput.bind(this) }/>              
          </View>

        </View>

        <TouchableHighlight 
          onPress={ this.editDone.bind(this) } 
          style={ styles.touchable } underlayColor="white">
          <View style={ styles.doneBtn }>
            <Text style={ styles.whiteFont }>Done</Text>
          </View>
        </TouchableHighlight>
      
      </View>
    );
   }
};


var styles = StyleSheet.create({

  city: {
    color: '#656565',
    marginLeft: 20
  },
  container: {
    marginTop: 75,
    alignItems: 'center'
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565',
  },
  doneBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: -40,
  },  
  image: {
    width: 350,
    height: 165,
    padding: 10
  },
  input: {
    position: 'absolute',
    left: 10,
    top: 4,
    right: 0,
    height: 20,
    fontSize: 14
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: 'black',
    borderColor: 'transparent'
  },
  inputs: {
    marginTop: 25,
    marginBottom: 10,
    flex: .25
  },
  listView: {
    backgroundColor: '#F5FCFF'
   },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff2f2',
    padding: 10
  },
  placeName: {
    fontSize: 14,
    marginBottom: 8,
  },
  rightContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  thumbnail: {
    width: 85,
    height: 81,
    marginRight: 10,
    marginTop: 10
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 20
  },
  touchable: {
    borderRadius: 100
  }
});

module.exports = EditPlace;

