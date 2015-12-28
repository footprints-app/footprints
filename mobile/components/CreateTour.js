'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var ViewCreatedTour = require('./ViewCreatedTour');
var utils = require('../lib/utility');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS,
  NavigatorIOS
} = React;

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
      userId: this.props.userId,
      description: '',
      category: '',
      duration: '',
      userName: '',
      cityName: '',
      state: '',
      country: '',
    };
  }

  viewTour (newTour) {
    var reqBody = this.state;
    utils.makeRequest('createTour', reqBody)
    .then(response => {
      console.log('response body in Create Tour: ', response);
      var tourId = response.id;
      utils.navigateTo.call(this, "View Tour", ViewCreatedTour, {tourId});
    });
  }

  render () {
    return (
      <View style={ styles.container }>
        <Image style={ styles.bg } source={{ uri: 'http://i.imgur.com/xlQ56UK.jpg' }} />
        
        <View style={ styles.inputs }>
          
          <View style={ styles.inputContainer }>
            <TextInput 
              style={ [styles.input, styles.whiteFont] }
              placeholder="Tour Name"
              placeholderTextColor="#FFF"
              value={ this.state.tourName }
              onChange={ utils.tourNameInput.bind(this) }/>
          </View>
         
          <View style={ styles.inputContainer }>
            <TextInput
              style={ [styles.input, styles.whiteFont] }
              placeholder="Category"
              placeholderTextColor="#FFF"
              value={ this.state.category }
              onChange={ utils.categoryInput.bind(this) }/>
          </View>
          
          <View style={ styles.inputContainer }>
            <TextInput
              style={ [styles.input, styles.whiteFont] }
              placeholder="Description"
              placeholderTextColor="#FFF"
              value={this.state.description}
              onChange={ utils.descriptionInput.bind(this) }/>
          </View>
          
          <View style={ styles.inputContainer }>
            <TextInput
              style={ [styles.input, styles.whiteFont] }
              placeholder="Duration"
              placeholderTextColor="#FFF"
              value={ this.state.duration }
              onChange={ utils.durationInput.bind(this) }/>
          </View>

          <View style={ styles.inputContainer }>
            <TextInput
              style={ [styles.input, styles.whiteFont] }
              placeholder="City"
              placeholderTextColor="#FFF"
              value={ this.state.cityName }
              onChange={ utils.cityNameInput.bind(this) }/>
          </View>

          <View style={ styles.inputContainer }>
            <TextInput
              style={ [styles.input, styles.whiteFont] }
              placeholder="State"
              placeholderTextColor="#FFF"
              value={ this.state.state }
              onChange={ utils.stateInput.bind(this) }/>
          </View>

          <View style={ styles.inputContainer }>
            <TextInput
              style={ [styles.input, styles.whiteFont] }
              placeholder="Country"
              placeholderTextColor="#FFF"
              value={ this.state.country }
              onChange={ utils.countryInput.bind(this) }/>
          </View>

        </View>

        <TouchableHighlight 
          onPress={ this.viewTour.bind(this) } 
          style={ styles.touchable } underlayColor="#FF3366">  
          <View style={ styles.createTour }>
            <Text style={ styles.whiteFont }>View Tour</Text>
          </View>
        </TouchableHighlight>

      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height
  },
  createTour: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: -200,
  },
  inputs: {
    marginTop: 100,
    marginBottom: 10,
    flex: .25
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent'
  },
  input: {
    position: 'absolute',
    left: 10,
    top: 4,
    right: 0,
    height: 20,
    fontSize: 14
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  },
  touchable: {
    borderRadius: 5
  }
});

module.exports = CreateTour;





