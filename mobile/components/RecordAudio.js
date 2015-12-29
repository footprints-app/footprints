'use strict';

var React = require('react-native');
var RNFS = require('react-native-fs');

var {
  NativeModules,
  Component,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  ActivityIndicatorIOS,
  AsyncStorage,
  Image
} = React;

var {
  RNRecordAudio,
  RNPlayAudio
} = NativeModules;

class RecordAudio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cassette: require('../assets/cassette.png')
    }
  }

  readDirectory() {
    // get a list of files and directories in the main bundle
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        console.log('GOT RESULT', result);
      })
  }
  
  record() {
    this.setState({cassette: require('../assets/cassette.gif')});
    RNRecordAudio.startRecord(

      "test.m4a", // filename

      function errorCallback(results) {

          console.log('JS Error: ' + results['errMsg']);

      },

      function successCallback(results) {

          console.log('JS Success: ' + results['successMsg']);

      }
    );
  }

  stopRec() {
    this.setState({cassette: require('../assets/cassette.png')});
    RNRecordAudio.stopRecord(

      "test.m4a", // filename

      function errorCallback(results) {

          console.log('JS Error: ' + results['errMsg']);

      },

      function successCallback(results) {

          console.log('JS Success: ' + results['successMsg']);

      }
    );
  }

  play() {
    this.setState({cassette: require('../assets/cassette.gif')});
    RNPlayAudio.startAudio(

      "test.m4a", // filename

      function errorCallback(results) {

          console.log('JS Error: ' + results['errMsg']);

      },

      function successCallback(results) {

          console.log('JS Success: ' + results['successMsg']);

      }
    );
  }

  pause() {
    this.setState({cassette: require('../assets/cassette.png')});
    RNPlayAudio.pauseAudio(

      "test.m4a", // filename

      function errorCallback(results) {

          console.log('JS Error: ' + results['errMsg']);

      },

      function successCallback(results) {

          console.log('JS Success: ' + results['successMsg']);

      }
    );
  }

  stop() {
    this.setState({cassette: require('../assets/cassette.png')});
    RNPlayAudio.stopAudio(

      "test.m4a", // filename

      function errorCallback(results) {

          console.log('JS Error: ' + results['errMsg']);

      },

      function successCallback(results) {

          console.log('JS Success: ' + results['successMsg']);

      }
    );

  }

  // done() {
  //   var storyPath = RNFS.DocumentDirectoryPath + "/story.m4a";
  //   var awsUrl = "walking-tour-media.s3-website-us-west-1.amazonaws.com";

  //   fetch(awsUrl, {
  //     method: "POST",
  //     headers: {},
  //     body: JSON.stringify({
  //       AWSAccessKeyId: "",
  //       file: storyPath,
  //       key: 
  //     })
  //   })
  // }

  render() {
    return (
      <View>
        <View style={ styles.cassette }>
          <Image style={{width: 400, height: 200}} source={this.state.cassette} />
        </View>

        <View style={ styles.controlsContainer }>
          <TouchableHighlight
            onPress={ this.record.bind(this) }
            style={ styles.touchable } underlayColor="white">
            <View style={ styles.recordBtn }>
              <Text style={ styles.whiteFont }>Record</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.stopRec.bind(this) } 
            style={ styles.touchable } underlayColor="white">  
            <View style={ styles.stopRecBtn }>
              <Text style={ styles.whiteFont }>Stop Recording</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.play.bind(this) } 
            style={ styles.touchable } underlayColor="white">  
            <View style={ styles.playBtn }>
              <Text style={ styles.whiteFont }>Play</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.pause.bind(this) } 
            style={ styles.touchable } underlayColor="white">  
            <View style={ styles.pauseBtn }>
              <Text style={ styles.whiteFont }>Pause</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.stop.bind(this) } 
            style={ styles.touchable } underlayColor="white">  
            <View style={ styles.stopBtn }>
              <Text style={ styles.whiteFont }>Stop</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

};

var styles = StyleSheet.create({
  cassette: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  recordBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  stopRecBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  playBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  pauseBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  stopBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  touchable: {
    borderRadius: 5
  },
});

module.exports = RecordAudio;
