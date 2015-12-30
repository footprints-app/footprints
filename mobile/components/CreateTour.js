'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var DeviceWidth = Dimensions.get('window').width;
var DeviceHeight = Dimensions.get('window').height;
var ViewCreatedTour = require('./ViewCreatedTour');
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
  category: t.maybe(t.String),
  description: t.maybe(t.String),
  duration: t.maybe(t.String),
});

var options = {
  auto: 'placeholders',
  fields: {
      tourName: {
        placeholder: 'Tour Name',
        placeholderTextColor: '#FFF',
      },
      category: {
        placeholder: 'Category',
        placeholderTextColor: '#FFF'
      },
      description: {
        placeholder: 'Description',
        placeholderTextColor: '#FFF'
      },
      duration: {
        placeholder: 'Duration',
        placeholderTextColor: '#FFF',
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
      // userId: null/*this.props.userId*/,
      description: '',
      category: '',
      duration: '',
      userName: '',
      cityName: '',
      state: '',
      country: '',
    };
  }

  viewTour () {
    var value = this.refs.form.getValue();
    console.log('input value...', value)

    var options = {
      reqBody: this.state
    }; 
    console.log('this.state after form chnage....', options.reqBody)
    var component = this;
    utils.makeRequest('createTour', component, options)
    .then(response => {
      console.log('response body in Create Tour: ', response);
      var tourId = response.id;
      console.log('tourId in create tour: ', tourId)
      utils.navigateTo.call(component, "View Tour", ViewCreatedTour, {tourId});
    })
    .done();
  }

  onChange(value) {
    this.setState(value);
  }

  render () {
    return (
      <View style={ styles.addPlaceContainer }>

        <View style={ [styles.photoAudioContainer, {marginTop: 50}] }>   
          <Text style={ styles.text }>Tour Details</Text>
        </View>
        
        <View style={{marginTop: 10}}>
          <Form
            ref="form"
            type={Tour}
            options={ options }
            value={ this.state.value }
            onChange={this.onChange.bind(this)}/>
        </View>
         <GooglePlacesAutocomplete
            placeholder='City'
            minLength={3} // minimum length of text to search 
            autoFocus={false}
            fetchDetails={false}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true 
              var cityStateCountry = data.description.split(','); 
              this.setState({cityName: cityStateCountry[0].trim(), state: cityStateCountry[1].trim() || '', country: cityStateCountry[2].trim() || '' });             
            }}
            getDefaultValue={() => {
              return '';
            }}
            query={{
              key: 'AIzaSyBpYCMNdcQg05gC87GcQeEw866rHpA9V1o',
              language: 'en', // language of the results 
              types: '(cities)'
            }}

            GooglePlacesSearchQuery={{
              rankby: 'distance',
            }}/>

        <TouchableHighlight onPress={() => alert('add photo')} underlayColor='#727272' style={{marginTop: 5}}>
          <View style={ [styles.photoAudioContainer, {marginTop: 5}] }>   
            <View style={{marginTop: 15}}>
              <Text style={ styles.text }>Add a Photo</Text>
            </View>
            <View>
              <Image source={require('../assets/photoicon.png')} style={[styles.photoIcon, {marginTop: 5}, {marginLeft: 15}]}/> 
            </View>
          </View>   
        </TouchableHighlight>

        <TouchableHighlight 
          style={ [styles.button, {marginTop: 15}] } 
          onPress={ this.viewTour.bind(this) } 
          underlayColor='#FFC107'>
          <Text style={ styles.buttonText }>Create Tour</Text>
        </TouchableHighlight>
      </View>

    );
  }
};

module.exports = CreateTour;





