'use strict';

var React = require('react-native');
var RNFS = require('react-native-fs');
var FileUpload = require('NativeModules').FileUpload;

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
    var path = RNFS.DocumentDirectoryPath
    RNFS.readFile(path + '/story.m4a', 'base64')
      .then((file) => {
        RNFS.writeFile(path + '/story2.m4a', file, 'base64')
          .then(() => {
            RNPlayAudio.startAudio(

              "story2.m4a", // filename

              function errorCallback(results) {

                  console.log('JS Error: ' + results['errMsg']);

              },

              function successCallback(results) {

                  console.log('JS Success: ' + results['successMsg']);

              }
            );
          })
      })
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
    var request_url = 'http://10.6.32.174:8000';
    //var request_url = 'http://thesisserver-env.elasticbeanstalk.com';

    // fetch(request_url + '/tours/sign_s3', {
    //   method: "GET",
    //   headers: {},
    // })
    // .then((response) => {
    //   var resp = JSON.parse(response._bodyText);
    //   console.log('Signed URL from Response: ', resp.signed_request);
    //   console.log('URL from Response: ', resp.url);
    //   var request = {
    //     uploadUrl: resp.signed_request,
    //     method: 'PUT',
    //     headers: {
    //       "x-amz-acl": 'public-read',
    //       "content-type": 'application/octet-stream'
    //     },
    //     files: [
    //       {
    //         filename: 'story.m4a',
    //         filepath: storyPath,
    //         filetype: 'application/octet-stream'
    //       }
    //     ]
    //   };
    //   FileUpload.upload(request, function(err, results) {
    //     console.log('upload: ', err, results);
    //   });
    // })
    
    // RNFS.readFile(storyPath, 'ascii')
    //  .then((file) => {
    //    console.log('File successfully read');
    //    fetch(request_url + '/tours/sign_s3', {
    //      method: "GET",
    //      headers: {},
    //    })
    //    .then((response) => {
    //      var resp = JSON.parse(response._bodyText);
    //      console.log('Signed URL from Response: ', resp.signed_request);
    //      console.log('URL from Response: ', resp.url);
    //      fetch(resp.signed_request, {
    //        method: "PUT",
    //        headers: {
    //          "x-amz-acl": 'public-read',
    //          "content-encoding": 'ascii',
    //          "content-type": 'audio/x-m4a'
    //        },
    //        body: file.toString()
    //      })
    //      .then((response) => {
    //        console.log('Response after PUT request: ', response);
    //      })
    //    })
    //  })

    RNFS.readFile(storyPath, 'base64')
      .then((file) => {
        console.log('File successfully read: ', file);
        var encodedFile = file.toString();
        fetch(request_url + '/tours/addaudio', {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            file: encodedFile
          })
        })
        .then((response) => {
          console.log("Response received from audio post: ", response);
        })
      })

  }

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

          <TouchableHighlight 
            onPress={ this.done.bind(this) } 
            style={ styles.touchable } underlayColor="white">  
            <View style={ styles.doneBtn }>
              <Text style={ styles.whiteFont }>Done</Text>
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
