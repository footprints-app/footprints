'use strict';

var React = require('react-native');
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

var Place = t.struct({

  placeName: t.String,
  address: t.String,
  description: t.String,
  placeOrder: t.Number

});

var options = {};

class AddPlace extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

  onPressSave(){
    var value = this.refs.form.getValue();
    //on sending post request backend will send a tour id
    //save tour id in frontend
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
    this.props.navigator.push({
      title: "My Tours",
      component: MyTours,
      passProps: {}
    });
  }

  render() {
    return (
      <View style={styles.container}>
      {/* display */}
      <Form
        ref="form"
        type={Place}
        options={options}/>

      <TouchableHighlight style={styles.button} onPress={ () => this.onPressSave() } underlayColor='#99d9f4'>
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
