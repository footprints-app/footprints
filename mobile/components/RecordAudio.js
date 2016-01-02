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
      isRecording: false,
      isUploading: false,
      loadingGif: require('../assets/loading.gif'),
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
    if(!this.state.isRecording) {
      this.setState({cassette: require('../assets/cassette.gif'),
                     isRecording: true
                   });
      RNRecordAudio.startRecord(
        "story.m4a", // filename

        function errorCallback(results) {
          console.log('JS Error: ' + results['errMsg']);
        },

        function successCallback(results) {
          console.log('JS Success: ' + results['successMsg']);
        }
      );
    } else {
      this.setState({cassette: require('../assets/cassette.png'),
                     isRecording: false
                   });
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
    this.setState({isUploading: true});
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
            this.setState({isUploading: false});
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
      <View style={ styles.mainContainer }>
        <View style={ audioStyles.cassette }>
          <Image style={{width: 300, height: 150}} source={this.state.cassette} />
        </View>

        <View style={ audioStyles.loadingGif }>
          <Image style={{width: 30, height: 30}} source={ this.state.isUploading === true ? this.state.loadingGif : null} />
        </View>

        <View>
          
          <TouchableHighlight
            onPress={ this.record.bind(this) }
            style={ [styles.touchable, {marginTop: 1}] }
            underlayColor="727272">
            <Image source={ this.state.isRecording === false ? require('../assets/recordbtn.png') : require('../assets/stopbtn.png') }
                     style={ [styles.editIcon, {width: 30}, {height: 30}, {marginLeft: 30}, {flex: 1}] } />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.play.bind(this) } 
            style={ [styles.touchable, {marginTop: 1}] }
            underlayColor="727272">
            <Image source={ require('../assets/playbtn.png') }
                     style={ [styles.editIcon, {width: 30}, {height: 30}, {marginLeft: 30}, {flex: 1}]} />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.pause.bind(this) } 
            style={ [styles.touchable, {marginTop: 1}] }
            underlayColor="727272">
            <Image source={ require('../assets/pausebtn.png') }
                     style={ [styles.editIcon, {width: 30}, {height: 30}, {marginLeft: 30}, {flex: 1}]} />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.stop.bind(this) } 
            style={ [styles.touchable, {marginTop: 1}] }
            underlayColor="727272">
            <Image source={ require('../assets/stopbtn.png') }
                     style={ [styles.editIcon, {width: 30}, {height: 30}, {marginLeft: 30}, {flex: 1}]} />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.done.bind(this) } 
            style={ styles.touchable } underlayColor="727272">
            <View style={ [styles.mainButton, {width: 150, alignItems: 'center', marginBottom: 20}] }>
              <Text style={ styles.whiteFont }>Done</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.skip.bind(this) } 
            style={ styles.touchable } underlayColor="727272">
            <View style={ [styles.mainButton, {width: 150, alignItems: 'center', marginBottom: 20}] }>
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
    marginTop: 20
  },
  loadingGif: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginTop: 20
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
