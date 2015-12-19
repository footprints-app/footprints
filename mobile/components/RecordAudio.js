'use strict';

var React = require('react-native');

var {
  NativeModules,
  Component,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  ActivityIndicatorIOS,
  AsyncStorage
} = React;

var {
  RNRecordAudio,
  RNPlayAudio
} = NativeModules;

class RecordAudio extends Component {

  constructor(props) {
    super(props);
    this.state = this.props;
  }
  
  record() {
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

  render() {
    return (
      <View>
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
    );
  }

};

var styles = StyleSheet.create({
  recordBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  stopRecBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  playBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  pauseBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  stopBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  touchable: {
    borderRadius: 5
  },
});

module.exports = RecordAudio;
