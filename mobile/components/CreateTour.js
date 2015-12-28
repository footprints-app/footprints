'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var ViewCreatedTour = require('./ViewCreatedTour');
var utils = require('../lib/utility');
var t = require('tcomb-form-native');
var Form = t.form.Form;
var styles = require('../lib/stylesheet');

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
  cityName: t.maybe(t.String),
  state: t.maybe(t.String),
  country: t.maybe(t.String),
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
    cityName: {
      placeholder: 'City',
      placeholderTextColor: '#FFF',
    },
    state: {
      placeholder: 'State',
      placeholderTextColor: '#FFF',
    },
    country: {
      placeholder: 'Country',
      placeholderTextColor: '#FFF',
    },
  },
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
      userId: null/*this.props.userId*/,
      description: '',
      category: '',
      duration: '',
      userName: '',
      cityName: '',
      state: '',
      country: '',
    };
  }

  componentDidMount () {
    var that = this;

    AsyncStorage.multiGet(['token', 'user'])
      .then(function(data) {
        that.setState({
          token: data[0][1],
          userId: data[1][1]
        })
      });
  }

  viewTour (newTour) {
    var options = {
      reqBody: this.state
    }; 
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
    // var value = this.refs.form.getValue();
    this.setState({value});
  }

  onPress (value) {
    var value = this.refs.form.getValue();
    if (value) {
      console.log('value from create tour', value);
    }
  }

  render () {
    return (
      <View style={ styles.addPlaceContainer }>

        <View style={ [styles.photoAudioContainer, {marginTop: 50}] }>   
          <Text style={ styles.text }>Add a Photo</Text>
        </View>
        
        <View style={{marginTop: 10}}>
          <Form
            ref="form"
            type={Tour}
            options={ options }
            value={ this.state.value }
            onChange={this.onChange}/>
        </View>

          {/*// <View style={ styles.inputContainer }>
          //   <TextInput 
          //     style={ [styles.input, styles.whiteFont] }
          //     placeholder="Tour Name"
          //     placeholderTextColor="#FFF"
          //     value={ this.state.tourName }
          //     onChange={ utils.tourNameInput.bind(this) }/>
          // </View>
         
          // <View style={ styles.inputContainer }>
          //   <TextInput
          //     style={ [styles.input, styles.whiteFont] }
          //     placeholder="Category"
          //     placeholderTextColor="#FFF"
          //     value={ this.state.category }
          //     onChange={ utils.categoryInput.bind(this) }/>
          // </View>
          
          // <View style={ styles.inputContainer }>
          //   <TextInput
          //     style={ [styles.input, styles.whiteFont] }
          //     placeholder="Description"
          //     placeholderTextColor="#FFF"
          //     value={this.state.description}
          //     onChange={ utils.descriptionInput.bind(this) }/>
          // </View>
          
          // <View style={ styles.inputContainer }>
          //   <TextInput
          //     style={ [styles.input, styles.whiteFont] }
          //     placeholder="Duration"
          //     placeholderTextColor="#FFF"
          //     value={ this.state.duration }
          //     onChange={ utils.durationInput.bind(this) }/>
          // </View>

          // <View style={ styles.inputContainer }>
          //   <TextInput
          //     style={ [styles.input, styles.whiteFont] }
          //     placeholder="City"
          //     placeholderTextColor="#FFF"
          //     value={ this.state.cityName }
          //     onChange={ utils.cityNameInput.bind(this) }/>
          // </View>

          // <View style={ styles.inputContainer }>
          //   <TextInput
          //     style={ [styles.input, styles.whiteFont] }
          //     placeholder="State"
          //     placeholderTextColor="#FFF"
          //     value={ this.state.state }
          //     onChange={ utils.stateInput.bind(this) }/>
          // </View>

          // <View style={ styles.inputContainer }>
          //   <TextInput
          //     style={ [styles.input, styles.whiteFont] }
          //     placeholder="Country"
          //     placeholderTextColor="#FFF"
          //     value={ this.state.country }
          //     onChange={ utils.countryInput.bind(this) }/>
          // </View>

        

        // <TouchableHighlight 
        //   onPress={ this.viewTour.bind(this) } 
        //   style={ styles.touchable } underlayColor="#FF3366">  
        //   <View style={ styles.createTour }>
        //     <Text style={ styles.whiteFont }>View Tour</Text>
        //   </View>
        // </TouchableHighlight>

      // </View>*/}

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
          underlayColor='#99d9f4'>
          <Text style={ styles.buttonText }>Create Tour</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

module.exports = CreateTour;





