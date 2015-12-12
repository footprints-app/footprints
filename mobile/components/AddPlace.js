'use strict';

var React = require('react-native');
var ViewCreatedTour = require('./ViewCreatedTour');
var utils = require('../lib/utility');
var t = require('tcomb-form-native');
var Form = t.form.Form;

var {
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;
/**
 * Place defines domain model for form
 */
var Place = t.struct({
  placeName: t.maybe(t.String),
  address: t.maybe(t.String),
  description: t.maybe(t.String),
  placeOrder: t.maybe(t.Number)
});

var options = {};

class AddPlace extends Component {
  
  /**
   * Creates an instance of AddPlace.
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressSave () {
    // console.log('in add place....', this.props.newTour)
    var createdTour = this.props.newTour;
  /**
   * getValue() gets the values of the form.
   */
    
    var value = this.refs.form.getValue();

    if ( value ) { // if validation fails, value will be null
      console.log(value);
    }
    utils.navigateTo.call(this, "View Tour", ViewCreatedTour, {createdTour});
  }
  
  /**
   * tcomb-form-native calls <Form type={Model} /> to generate and render a form based on that domain model
   */
  render () {
    return (
      <View style={styles.container}>
      {/* display */}
      <Form
        ref="form"
        type={Place}
        options={options}/>

      <TouchableHighlight style={styles.button} onPress={ this.onPressSave.bind(this) } underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#FF3366',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = AddPlace;
