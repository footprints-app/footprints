'use strict';

var React = require('react-native');
var utils = require('../lib/utility');
var ViewCreatedTour = require('./ViewCreatedTour');
var SelectImage = require('./SelectImage');
var RecordAudio = require('./RecordAudio');
var styles = require('../lib/stylesheet');
var t = require('tcomb-form-native');
var Form = t.form.Form;
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
var formStyles = require('../lib/formStyleEditMode');

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

var EditPlaceDetail = t.struct({
  placeName: t.maybe(t.String),
  description: t.maybe(t.String),
  placeOrder: t.maybe(t.Number)
});

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
      tourId: this.props.place.tourId,
      placeOrder: this.props.place.placeOrder,
      origPlaceOrder: this.props.place.placeOrder,
      numPlacesInTour: 0,
      tourName: ''
    };
   }

  componentWillMount () {
    var component = this;
    var options = {
      reqBody: {},
      reqParam: this.state.tourId
    }; 
    utils.makeRequest('tour', component, options)
    .then((response) => {
      console.log('componentWillMount in EditPlace, response: ', response)
      this.setState({numPlacesInTour: response.places.length, tourName: response.tourName})
    })
    .done();
  }

   onChange(value) {
    this.setState(value);
  }

   editDone() {
    var options = {
      reqBody: this.state,
      reqParam: this.state.id
    };
    var that = this;
    utils.makeRequest('editPlace', that, options)
    .then(response => {
      if(that.state.placeOrder !== that.state.origPlaceOrder) {
        var orderOptions = {
          reqBody: { 
            placeOrder: that.state.placeOrder, 
            placeId: that.state.id, 
            origPlaceOrder: that.state.origPlaceOrder
          },
          reqParam: that.state.tourId
        };
        utils.makeRequest('placeOrders', that, orderOptions)
        .then(response => {
          var ViewCreatedTour = require('./ViewCreatedTour');
          that.props.navigator.replace({
            title: that.state.tourName,
            component: ViewCreatedTour,
            passProps: {
                        tourId: that.state.tourId,
                        editMode: true
                       }
          });
        });

      } else {
        var ViewCreatedTour = require('./ViewCreatedTour');
        that.props.navigator.replace({
            title: that.state.tourName,
            component: ViewCreatedTour,
            passProps: {
                        tourId: that.state.tourId,
                        editMode: true
                       }
        });
      }          
    });
   }

  editPhoto() {
    /*TODO: this should send a put request to update tour photo*/
    var props = {
      tourId: this.state.tourId,
      placeId: this.state.id
    }
    utils.navigateTo.call(this, "Select a Photo", SelectImage, props);
  }

  editAudio() {
    var props = {
      tourId: this.state.tourId,
      placeId: this.state.id
    }
    utils.navigateTo.call(this, "Record Audio", RecordAudio, props);
  }

  render() {
    var options = {
      auto: 'placeholders',
      fields: {
        placeName: {
          placeholder: this.state.placeName,
          placeholderTextColor: '#808080',
          label: 'Place Name'
        },
        description: {
          placeholder: this.state.description,
          placeholderTextColor: '#808080',
          label: 'Description'
        },
        placeOrder: {
          placeholder: this.state.placeOrder.toString(),
          placeholderTextColor: '#808080',
          label: 'Stop # / ' + this.state.numPlacesInTour + ' total stops'
        }
      },
      stylesheet: formStyles
    };
 
    return (
      <View style={ styles.addPlaceContainer }>

        <Image style={ styles.image } source={{ uri: this.state.image }} />

        <View style={{ marginTop: 55 }}>
          <Form
            ref="form"
            type={ EditPlaceDetail }
            options={ options }
            value={ this.state.value }
            onChange={ this.onChange.bind(this) }/>
        </View>


        <Text style={{ fontSize: 15, color: '#F0F0F0', fontWeight: '500', marginBottom: 2 }}>
          Address
        </Text>
        <GooglePlacesAutocomplete
          placeholder={this.state.address}
          placeholderTextColor='#808080'
          minLength={3} // minimum length of text to search 
          autoFocus={false}
          fetchDetails={true}
          onPress={ (data, details = null) => { // 'details' is provided when fetchDetails = true 
            var lat = details.geometry.location.lat;
            var lng = details.geometry.location.lng;
            this.setState({ address: details.formatted_address + '|' + lat + '|' + lng });
          }}
          styles={ utils.googlePlacesStyles }
          getDefaultValue={ () => { return ''; }}// text input default value 
          query={{ key: 'AIzaSyBpYCMNdcQg05gC87GcQeEw866rHpA9V1o', language: 'en'}} // language of the results  
          GooglePlacesSearchQuery={{ rankby: 'distance', }}/>
        
        <TouchableHighlight 
          onPress={ this.editPhoto.bind(this) } 
          underlayColor='#727272'>
          <View style={ [styles.photoAudioContainer, {marginTop: 5}] }>
            <View style={{ marginTop: 17 }}>
              <Text style={ [styles.text, {fontSize: 16}] }>Edit Photo</Text>
            </View>
            <View>
              <Image source={ require('../assets/photoicon.png') } 
                style={ [styles.photoIcon, {marginLeft: 15}, {width: 35}, {height: 35}] }/>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight 
          onPress={ this.editAudio.bind(this) } 
          underlayColor='#727272' 
          style={{ marginTop: 2 }}>
          <View style={ [styles.photoAudioContainer, {marginTop: 5}] }>
            <View style={{ marginTop: 17 }}>
              <Text style={ [styles.text, {fontSize: 16}] }>Edit Audio</Text>
            </View>
            <View>
              <Image source={ require('../assets/audioicon.png') } 
                style={ [styles.photoIcon, {marginLeft: 15}, {width: 35}, {height: 35}] }/>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight 
          style={ [styles.button, {marginBottom: 35}, {padding: 5}, {marginTop: 10}, {borderRadius: 15}] } 
          onPress={ this.editDone.bind(this) } 
          underlayColor='#FFC107'>
          <Text style={ styles.buttonText }>Done</Text>
        </TouchableHighlight>
      
      </View>
    );
   }
};

module.exports = EditPlace;
