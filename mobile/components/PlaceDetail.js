'use strict';

var React = require('react-native');
var styles = require('../lib/stylesheet');
var audio = require('react-native').NativeModules.RNAudioPlayerURL;

var {
  StyleSheet,
  Image,
  View,
  Text,
  Component,
  TouchableHighlight
} = React;

class PlaceDetail extends Component {

   /**
   * Creates an instance of PlaceDetail and sets the state with place details passed from props.
   * 
   * @constructor
   * @param {object} props is the place object from the tour that rendered this PlaceDetail view.
   * @this {PlaceDetail}
   */
  constructor(props) {
    super(props);
    console.log('this.props in PlaceDetail: ', this.props);
    this.state = {
      id: this.props.route.passProps.place.id || this.props.place.id,
      placeName: this.props.route.passProps.place.placeName || this.props.place.placeName,
      image: this.props.route.passProps.place.image || null,
      description: this.props.route.passProps.place.description || this.props.place.description,
      address: this.props.route.passProps.place.address || this.props.place.address,
      audio: this.props.route.passProps.place.audio || this.props.place.audio,
      playing: false,
    };
  }

  componentDidMount () {
    //audio.initWithURL('https://s3-us-west-1.amazonaws.com/walking-tour-media/example.caf');
    audio.initWithURL(this.state.audio);    

  }

  onPlayAudio () {
    if(this.state.playing) {
      audio.pause();
      this.setState({playing: false});
    } else {
      audio.play();
      this.setState({playing: true});
    }
  }

  render() {
    return (
      <View style={ styles.tourContainer }>
        <Image style={styles.headerPhoto} source={{uri: this.state.image}} />
          <Text style={[styles.story, {textAlign: 'center', color: '#00BCD4'}]}> {this.state.placeName}</Text>
        <Text style={[styles.description, {textAlign: 'center'}]}>
        <Text style={styles.bold}>Address:</Text> {this.state.address.split(',')[0] + ', ' + this.state.address.split(',')[1]}
        </Text>
        <View style={ [{flex:1}, {marginRight: 20}, {marginLeft: 20}] }>
          <TouchableHighlight 
              style={ [styles.button, {marginBottom: 20}, {padding: 10}] } 
              onPress={ this.onPlayAudio.bind(this) } 
              underlayColor='#FFC107'>
              <Text style={ styles.buttonText }>{this.state.playing === true ? 'Pause' : 'Listen'}</Text>
            </TouchableHighlight>
            {/*<Text style={[styles.story, {color: '#FFC107', marginLeft: 10}]}>What is the Story?</Text>*/}
            <Text style={styles.description}>{this.state.description}</Text>
        </View>
      </View>
    );
  }
};

module.exports = PlaceDetail;
