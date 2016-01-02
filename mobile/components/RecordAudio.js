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
      cassette: require('../assets/cassette.png'),
      playBtn: require('../assets/playgold.png'),
      pauseBtn: require('../assets/pausegold.png'),
      stopBtn: require('../assets/stopgold.png'),
      recordBtn: require('../assets/recordgold.png')
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
                     isRecording: true,
                     recordBtn: require('../assets/recordblue.png')
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
                     isRecording: false,
                     recordBtn: require('../assets/recordgold.png')
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
    this.setState({cassette: require('../assets/cassette.gif'),
                   playBtn: require('../assets/playblue.png')
                 });

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
    this.setState({cassette: require('../assets/cassette.png'),
                   playBtn: require('../assets/playgold.png'),
                   pauseBtn: require('../assets/pauseblue.png')
                 });
    var self = this;
    RNPlayAudio.pauseAudio(
      "story.m4a", // filename

      function errorCallback(results) {
        console.log('JS Error: ' + results['errMsg']);
      },

      function successCallback(results) {
        console.log('JS Success: ' + results['successMsg']);
        self.setState({pauseBtn: require('../assets/pausegold.png')})
      }
    );
  }

  stop() {
    this.setState({cassette: require('../assets/cassette.png'),
                   playBtn: require('../assets/playgold.png'),
                   stopBtn: require('../assets/stopblue.png')
                 });
    var self = this;
    RNPlayAudio.stopAudio(
      "story.m4a", // filename

      function errorCallback(results) {
        console.log('JS Error: ' + results['errMsg']);
      },

      function successCallback(results) {
        console.log('JS Success: ' + results['successMsg']);
        self.setState({stopBtn: require('../assets/stopgold.png')})        
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

        var options = {
          reqParam: component.state.placeId,
          reqBody: {
            file: encodedFile
          }
        }
        console.log('reqParam (placeId) from RecordAudio: ', options.reqParam);
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
        <View style={ styles.cassette }>
          <Image style={{width: 300, height: 150}} source={this.state.cassette} />
        </View>

        <View style={ styles.loadingGif }>
          <Image style={{width: 50, height: 50}} source={ this.state.isUploading === true ? this.state.loadingGif : null} />
        </View>

        <View style={ [styles.audioControlsContainer, {height: 75}] }>
          <TouchableHighlight
            onPress={ this.record.bind(this) }
            style={ [styles.touchable, {marginTop: 1} ]}
            underlayColor="727272">
            <Image source={ this.state.recordBtn }
                     style={ [styles.editIcon, {width: 30}, {height: 30}, {marginLeft: 1}, {flex: 0.10}] } />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.play.bind(this) } 
            style={ [styles.touchable, {marginTop: 1} ]}
            underlayColor="727272">
            <Image source={ this.state.playBtn }
                     style={ [styles.editIcon, {width: 30}, {height: 30}, {marginLeft: 30}, {flex: 0.25}] } />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.pause.bind(this) } 
            style={ [styles.touchable, {marginTop: 1} ]}
            underlayColor="727272">
            <Image source={ this.state.pauseBtn }
                     style={ [styles.editIcon, {width: 30}, {height: 30}, {marginLeft: 30}, {flex: 0.75}] } />
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.stop.bind(this) } 
            style={ [styles.touchable, {marginTop: 1} ]}
            underlayColor="727272">
            <Image source={ this.state.stopBtn }
                     style={ [styles.editIcon, {width: 30}, {height: 30}, {marginLeft: 30}, {flex: 0.90}] } />
          </TouchableHighlight>
        </View>

        <TouchableHighlight 
          onPress={ this.done.bind(this) } 
          style={ styles.touchable } underlayColor="727272">
          <View style={ [styles.button, {width: 280}, {marginBottom: 10}, {padding: 5}, {marginTop: 10}, {borderRadius: 15}] }>
            <Text style={ styles.whiteFont }>Done</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight 
          onPress={ this.skip.bind(this) } 
          style={ styles.touchable } underlayColor="727272">
          <View style={ [styles.button, {width: 280}, {marginBottom: 75}, {padding: 5}, {marginTop: 10}, {borderRadius: 15}] }>
            <Text style={ styles.whiteFont }>Skip</Text>
          </View>
        </TouchableHighlight>


      </View>
    );
  }

};

module.exports = RecordAudio;
