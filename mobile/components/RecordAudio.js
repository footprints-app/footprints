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
  RNRecordAudio
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

  stop() {
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
