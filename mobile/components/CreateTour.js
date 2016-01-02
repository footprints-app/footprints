'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;
var ViewCreatedTour = require('./ViewCreatedTour');
var SelectImage = require('./SelectImage');
var utils = require('../lib/utility');
var t = require('tcomb-form-native');
var Form = t.form.Form;
var formStyles = require('../lib/form_stylesheet');
var styles = require('../lib/stylesheet');
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Component,
  AsyncStorage,
  NavigatorIOS
} = React;

var Tour = t.struct({
  tourName: t.maybe(t.String),
  description: t.maybe(t.String),
  duration: t.maybe(t.Number)
});

var options = {
  auto: 'placeholders',
  fields: {
    tourName: {
      placeholder: 'Tour Name',
      placeholderTextColor: '#808080',
    },
    description: {
      placeholder: 'Description',
      placeholderTextColor: '#808080'
    },
    duration: {
      placeholder: 'Duration',
      placeholderTextColor: '#808080',
    },
  },
  stylesheet: formStyles
};


class CreateTour extends Component {

  /**
   * Creates an instance of CreateTour and sets the state with empty tour details.
   * @constructor
   * @this {CreateTour}
   */
  constructor(props){
    super(props);
    this.state = {
      tourName: '',
      description: '',
      category: '',
      duration: 0,
      userName: '',
      cityName: '',
      state: '',
      country: '',
    };
  }

  createAndAddPhoto () {
    var value = this.refs.form.getValue();
    console.log('input value...', value)
    var options = {
      reqBody: this.state
    }; 
    var component = this;
    utils.makeRequest('createTour', component, options)
    .then(response => {
      console.log('response body in Create Tour: ', response);
      var props = {
        tourId: response.id,
        createTourView: true
      }
      utils.navigateTo.call(component, "Add Tour Photo", SelectImage, props);
    })
    .done();
  }

  onChange(value, path) {
    this.setState(value);
  }

  clearText () {
    this.refs.form.getComponent('tourName').refs.input.clear();
    this.refs.form.getComponent('description').refs.input.clear();
    this.refs.form.getComponent('duration').refs.input.clear();
    this.refs.searchField.refs.textInput.clear();
  }

  render () {
    return (
      <View style={ styles.addPlaceContainer }>

        <View style={ [styles.photoAudioContainer, {marginTop: 50}] }>   
          <Text style={ styles.text }>Tour Details</Text>
        </View>
        
        <View style={{ marginTop: 10 }}>
          <Form
            ref="form"
            type={Tour}
            options={ options }
            controlled={true}
            value={ this.state.value }
            onChange={ this.onChange.bind(this) }/>
        </View>
        <GooglePlacesAutocomplete
          ref='searchField'
          placeholder='City'
          placeholderTextColor='#808080'
          minLength={3} // minimum length of text to search 
          autoFocus={false}
          fetchDetails={false}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true 
            var cityStateCountry = data.description.split(','); 
            this.setState({cityName: cityStateCountry[0].trim(), 
              state: cityStateCountry[1].trim() || '', 
              country: cityStateCountry[2] ? cityStateCountry[2].trim() : '' 
            });             
          }}
          getDefaultValue={() => { return ''; }}
          query={{
            key: 'AIzaSyBpYCMNdcQg05gC87GcQeEw866rHpA9V1o',
            language: 'en', // language of the results 
            types: '(cities)'
          }}
          styles={ utils.googlePlacesStylesCreateTour }
          GooglePlacesSearchQuery={{ rankby: 'distance', }}/>
        
        <TouchableHighlight 
          style={ [styles.button, {marginBottom: 45}, {padding: 10}] } 
          onPress={ () => { 
            this.createAndAddPhoto();
            this.clearText();
          }}
          underlayColor='#FFC107'>
          <Text style={ styles.buttonText }>Next</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

module.exports = CreateTour;
