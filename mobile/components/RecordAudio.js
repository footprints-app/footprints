'use strict';

var React = require('react-native');
var RNFS = require('react-native-fs');
var FileUpload = require('NativeModules').FileUpload;
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');

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
      placeId: this.props.placeId,
      tourId: this.props.tourId,
      routeBackToEditTour: this.props.routeBackToEditTour || true,
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
      "story.m4a", // filename

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
      "story.m4a", // filename

      function errorCallback(results) {
        console.log('JS Error: ' + results['errMsg']);
      },

      function successCallback(results) {
        console.log('JS Success: ' + results['successMsg']);
      }
    );
  }

  play() {
    this.readDirectory();
    this.setState({cassette: require('../assets/cassette.gif')});

    RNPlayAudio.startAudio(
      "story2.m4a", // filename

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
      "story.m4a", // filename

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
      "story.m4a", // filename

      function errorCallback(results) {
        console.log('JS Error: ' + results['errMsg']);
      },

      function successCallback(results) {
        console.log('JS Success: ' + results['successMsg']);
      }
    );

  }

  done() {
    var storyPath = RNFS.DocumentDirectoryPath + "/story.m4a";
    //var request_url = 'http://10.6.32.174:8000';
    //var request_url = 'http://thesisserver-env.elasticbeanstalk.com';
    var reqType = 'addPlaceAudio';
    var component = this;
    var ViewCreatedTour = require('./ViewCreatedTour');


    //Props to pass down to ViewCreatedTour
    var props = {
      tourId: this.state.tourId,
      editMode: this.state.routeBackToEditTour
    }

    RNFS.readFile(storyPath, 'base64')
      .then((file) => {
        console.log('File successfully converted to base64');
        var encodedFile = file.toString();
        // fetch(request_url + '/tours/addaudio', {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": 'application/json'
        //   },
        //   body: JSON.stringify({
        //     file: encodedFile
        //   })
        // })
        // .then((response) => {
        //   console.log("Response received from audio post: ", response);
        // })
        var options = {
          reqParam: component.state.placeId,
          reqBody: {
            file: encodedFile
          }
        }
        console.log('reqParam from RecordAudio: ', options.reqParam);
        utils.makeRequest(reqType, component, options)
          .then((response) => {
            console.log('Audio added to place: ', response);
            component.props.navigator.replace({
              title: "Your Tour",
              component: ViewCreatedTour,
              passProps: props
            })
          })
      })

  }

  skip() {
    var ViewCreatedTour = require('./ViewCreatedTour');
    var props = {
      tourId: this.state.tourId,
      editMode: this.state.routeBackToEditTour
    }

    this.props.navigator.replace({
      title: "Your Tour",
      component: ViewCreatedTour,
      passProps: props
    })
  }

  render() {
    return (
      <View>
        <View style={ audioStyles.cassette }>
          <Image style={{width: 300, height: 150}} source={this.state.cassette} />
        </View>

        <View style={ audioStyles.controlsContainer }>
          
          <TouchableHighlight
            onPress={ this.record.bind(this) }
            style={ [styles.touchable, {marginTop: 1}] }
            underlayColor="727272">
            <Image source={ require('../assets/recordbtn.png') }
                     style={ [styles.editIcon, {width: 25}, {height: 25}, {marginLeft: 30}] } />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.stopRec.bind(this) } 
            style={ [styles.touchable, {marginTop: 1}] }
            underlayColor="727272">
            <Image source={ require('../assets/stopbtn.png') }
                     style={ [styles.editIcon, {width: 25}, {height: 25}, {marginLeft: 30}] } />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.play.bind(this) } 
            style={ [styles.touchable, {marginTop: 1}] }
            underlayColor="727272">
            <Image source={ require('../assets/playbtn.png') }
                     style={ [styles.editIcon, {width: 25}, {height: 25}, {marginLeft: 30}] } />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.pause.bind(this) } 
            style={ [styles.touchable, {marginTop: 1}] }
            underlayColor="727272">
            <Image source={ require('../assets/pausebtn.png') }
                     style={ [styles.editIcon, {width: 25}, {height: 25}, {marginLeft: 30}] } />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.stop.bind(this) } 
            style={ [styles.touchable, {marginTop: 1}] }
            underlayColor="727272">
            <Image source={ require('../assets/stopbtn.png') }
                     style={ [styles.editIcon, {width: 25}, {height: 25}, {marginLeft: 30}] } />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.done.bind(this) } 
            style={ styles.touchable } underlayColor="727272">
            <View style={ [styles.mainButton, {width: 200, alignItems: 'center', marginBottom: 20}] }>
              <Text style={ styles.whiteFont }>Done</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.skip.bind(this) } 
            style={ styles.touchable } underlayColor="727272">
            <View style={ [styles.mainButton, {width: 200, alignItems: 'center', marginBottom: 20}] }>
              <Text style={ styles.whiteFont }>Skip</Text>
            </View>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

};

var audioStyles = StyleSheet.create({
  cassette: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginTop: 75
  },
  doneBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 5,
  },
  recordBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 5,
  },
  stopRecBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 5,
  },
  playBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 5,
  },
  pauseBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 5,
  },
  stopBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: 5,
  },
  touchable: {
    borderRadius: 5
  },
});

module.exports = RecordAudio;
