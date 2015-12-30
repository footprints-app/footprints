'use strict';

var React = require('react-native');
var utils = require('../lib/utility');
var ViewCreatedTour = require('./ViewCreatedTour');
var SelectImage = require('./SelectImage');
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
  // address: t.maybe(t.String),
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
      numPlacesInTour: 0
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
      this.setState({numPlacesInTour: response.places.length})
    })
    .done();
  }

   onChange(value) {
    this.setState(value);
  }

   editDone() {
    console.log('reqBody from editDone button: ', this.state);
    var options = {
      reqBody: this.state,
      reqParam: this.state.id
    };
    var that = this;
    utils.makeRequest('editPlace', that, options)
    .then(response => {
      console.log('Response body from server after editing place: ', response.body);
      var tourOptions = {
        reqBody: {},
        reqParam: that.state.tourId
      };
      utils.makeRequest('tour', that, tourOptions)
        .then((response) => {
          console.log('Tour recieved from request: ', response);
          var ViewCreatedTour = require('./ViewCreatedTour');
          var tourId = that.state.tourId;
          that.props.navigator.replace({
            title: response.tourName,
            component: ViewCreatedTour,
            passProps: {
                        tourId: response.id,
                        editMode: true
                       }
          });
          // utils.navigateTo.call(that, response.tourName, ViewCreatedTour, {tourId: response.id, editMode: true});
        })
      // that.props.navigator.pop();
    })
   }

    editPhoto() {
      /*TODO: this should send a put request to update tour photo*/
      var props = {
        tourId: this.state.tourId,
        placeId: this.state.id
      }
      utils.navigateTo.call(this, "Select a Place Photo", SelectImage, props);
    }

   render() {
    var options = {
        auto: 'placeholders',
        fields: {
          placeName: {
            placeholder: this.state.placeName,
            placeholderTextColor: '#FFF',
            label: 'Place Name'
          },
          description: {
            placeholder: this.state.description,
            placeholderTextColor: '#FFF',
            label: 'Description'
          },
          placeOrder: {
            placeHolder: this.state.placeOrder
            placeholderTextColor: '#FFF',
            label: 'Stop # out of ' + this.state.numPlacesInTour + ' stops'
          }
        },
        stylesheet: formStyles
      };
 
    return (
      <View style={ styles.addPlaceContainer }>

        <Image style={ styles.image } source={{ uri: this.state.image }} />

        <View style={{ marginTop: 60 }}>
          <Form
            ref="form"
            type={ EditPlaceDetail }
            options={ options }
            value={ this.state.value }
            onChange={this.onChange.bind(this)}/>
        </View>

        <Text style={{fontSize: 15, color: '#999999', fontWeight: '500', marginBottom: 2}}>
          Search for Address
        </Text>
        <GooglePlacesAutocomplete
          placeholder={this.state.address}
          minLength={3} // minimum length of text to search 
          autoFocus={false}
          fetchDetails={true}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true 
            console.log('data: ', data);
            console.log('address: ', details.formatted_address)
            this.setState({ address: details.formatted_address });
          }}
          styles={utils.googlePlacesStyles}
          getDefaultValue={() => { return ''; }}// text input default value 
          query={{ key: 'AIzaSyBpYCMNdcQg05gC87GcQeEw866rHpA9V1o', language: 'en'}} // language of the results  
          GooglePlacesSearchQuery={{ rankby: 'distance', }}/>e
        
        {/*<View style={ styles.inputs }>
                
                  <View style={ styles.inputContainer }>
                    <TextInput
                      style={ [styles.input] }
                      placeholder={ this.state.placeName }
                      placeholderTextColor="black"
                      value={ this.state.placeName }
                      onChange={ utils.setStateFromInput.bind(this, 'placeName') }/>              
                  </View>
        
                  <View style={ styles.inputContainer }>
                    <TextInput
                      style={ [styles.input] }
                      placeholder={ this.state.address }
                      placeholderTextColor="black"
                      value={ this.state.address }
                      onChange={ utils.setStateFromInput.bind(this, 'address') }/>              
                  </View>
                  
                  <View style={ styles.inputContainer }>
                    <TextInput
                      style={ [styles.input] }
                      placeholder={ this.state.description }
                      placeholderTextColor="black"
                      value={ this.state.description }
                      onChange={ utils.setStateFromInput.bind(this, 'description') }/>              
                  </View>
        
                </View>*/}

        <TouchableHighlight 
          onPress={this.editPhoto.bind(this)} 
          underlayColor='#727272' 
          style={{marginTop: 10}}>
          <View style={ [styles.photoAudioContainer, {marginTop: 5}] }>
            <View style={{marginTop: 17}}>
              <Text style={ [styles.text, {fontSize: 16}] }>Edit Photo</Text>
            </View>
            <View>
              <Image source={require('../assets/photoicon.png')}
                     style={[styles.photoIcon, {marginLeft: 15}, {width: 35}, {height: 35}]}/>
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight 
          style={ [styles.button, {marginBottom: 45}, {padding: 10}] } 
          onPress={ this.editDone.bind(this) } 
          underlayColor='#FFC107'>
          <Text style={ styles.buttonText }>Done</Text>
        </TouchableHighlight>

        {/*<TouchableHighlight 
                  onPress={ this.editDone.bind(this) } 
                  style={ styles.touchable } underlayColor="white">
                  <View style={ styles.doneBtn }>
                    <Text style={ styles.whiteFont }>Done</Text>
                  </View>
                </TouchableHighlight>*/}
      
      </View>
    );
   }
};

module.exports = EditPlace;
