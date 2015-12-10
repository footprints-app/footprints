'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

// var Main = require('./Main');

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
  
  constructor(props){
    super(props);
    this.state = {
      tourName: '',
      description: '',
      category: '',
      duration: '',
      userName: '',
      cityName: '',
      state: '',
      country: ''
    };
  }

  viewTour () {
    alert('tour created, go to view tour');
    //   this.props.navigator.push({
    //   title: "View Tour",
    //   component: ViewTour,
    //   passProps: {}
    // });
  }

  tourNameInput(event) {
    this.setState({ tourName: event.nativeEvent.text });
  }
 
  descriptionInput(event) {
    this.setState({ description: event.nativeEvent.text });
  }

  categoryInput(event) {
    this.setState({ category: event.nativeEvent.text });
  }
 
  durationInput(event) {
    this.setState({ duration: event.nativeEvent.text });
  }

  userNameInput(event) {
    this.setState({ userName: event.nativeEvent.text });
  }
 
  cityNameInput(event) {
    this.setState({ cityName: event.nativeEvent.text });
  }

  stateInput(event) {
    this.setState({ state: event.nativeEvent.text });
  }
 
  countryInput(event) {
    this.setState({ country: event.nativeEvent.text });
  }

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
        
        <View style={styles.inputs}>
          
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, styles.whiteFont]}
              placeholder="Tour Name"
              placeholderTextColor="#FFF"
              value={this.state.tourName}
              onChange={this.tourNameInput.bind(this)}/>
          </View>
         
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.whiteFont]}
              placeholder="Category"
              placeholderTextColor="#FFF"
              value={this.state.category}
              onChange={this.categoryInput.bind(this)}/>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.whiteFont]}
              placeholder="Description"
              placeholderTextColor="#FFF"
              value={this.state.description}
              onChange={this.descriptionInput.bind(this)}/>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.whiteFont]}
              placeholder="Duration"
              placeholderTextColor="#FFF"
              value={this.state.duration}
              onChange={this.durationInput.bind(this)}/>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.whiteFont]}
              placeholder="User Name"
              placeholderTextColor="#FFF"
              value={this.state.userName}
              onChange={this.userNameInput.bind(this)}/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.whiteFont]}
              placeholder="City"
              placeholderTextColor="#FFF"
              value={this.state.cityName}
              onChange={this.cityNameInput.bind(this)}/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.whiteFont]}
              placeholder="State"
              placeholderTextColor="#FFF"
              value={this.state.state}
              onChange={this.stateInput.bind(this)}/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.whiteFont]}
              placeholder="Country"
              placeholderTextColor="#FFF"
              value={this.state.country}
              onChange={this.countryInput.bind(this)}/>
          </View>

        </View>

        <TouchableHighlight onPress={ this.viewTour.bind(this) } style={styles.touchable} underlayColor="#FF3366">  
          <View style={styles.createTour}>
            <Text style={styles.whiteFont}>Create Tour</Text>
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





