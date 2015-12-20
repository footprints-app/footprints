'use strict';

var React = require('react-native');
// var MyTours = require('./MyTours');
var utils = require('../lib/utility');
var PlaceDetail = require('./PlaceDetail.js');
var EditPlace = require('./EditPlace.js');
var styles = require('../lib/stylesheet');
var SelectImage = require('./SelectImage');

var {
  StyleSheet,
  Image,
  View,
  Text,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput,
  AsyncStorage,
  ScrollView
} = React;

class ViewCreatedTour extends Component {
  /**
   * Creates an instance of ViewCreatedTour.
   * ListView uses DataSource interface to determine which rows have changed over the course of updates.
   * @this {ViewCreatedTours}
   */
  constructor(props) {
    console.log('props in view ViewCreatedTours', props)
    super(props);
    this.state = {
      tourId: this.props.tourId || this.props.tour.id,
      tour: {},
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      editMode: this.props.editMode || false,
      tourName: '',
      userId: '',
      description: '',
      image: '',
      category: '',
      duration: '',
      userName: '',
      cityName: '',
      state: '',
      country: ''
    };
  }
  /**
   * ComponentDidMount function is called as soon as the render method is executed.
   * It fetches data from the database and sets the state with the fetched data.
   */
  componentDidMount () {
    AsyncStorage.multiGet(['token', 'user'])
      .then(function(data) {
        if(data) {
          this.setState({
            token: data[0][1],
            userId: +data[1][1]
          });
        }
      });
    this.fetchData();
  }

  addPlace () {
    var tourId = this.state.tourId;
    var AddPlace = require('./AddPlace');
    utils.navigateTo.call(this, "Add Place", AddPlace, {tourId});
  }

  addPhoto () {
    /*TODO: this should send a put request to update tour photo*/
    var tourId = this.state.tourId;
    utils.navigateTo.call(this, "Select a Tour Photo", SelectImage, {tourId});
  }
  onPressDone () {
    var MyTours = require('./MyTours');
    var userId = this.state.tour.userId;
    utils.navigateTo.call(this, "My Tours", MyTours, {userId});
  }

  toggleEdit () {
    var newEditState = !this.state.editMode;
    this.setState({editMode: newEditState});
    console.log("Edit Mode: ", this.state.editMode);
  }

  editDone() {
    var reqBody = this.state;
    console.log('reqBody from editDone button: ', reqBody);
    var reqParam = this.state.tourId;
    utils.makeRequest('editTour', reqBody, reqParam)
    .then(response => {
      console.log('Response body from server after Editing a Tour: ', response);
      this.setState({editMode: false});
      this.fetchData();
    })
  }

  deletePlace(place) {
    console.log(place);
    var reqBody = place;
    var reqParam = place.id;
    utils.makeRequest('deletePlace', reqBody, reqParam)
    .then(response => {
      console.log('Response body from server after deleting a place: ', response);
      utils.makeRequest('tour', {}, this.state.tourId)
       .then((response) => {
        var places = response.places;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(places)
        })
       })
    })
  }

  fetchData() {
    utils.makeRequest('tour', {}, this.state.tourId)
    .then((response) => {
      console.log('response body from View Created Tour: ', response);
      var places = response.places;
      this.setState({
        tour: response,
        userId: response.userId,
        tourName: response.tourName,
        description: response.description,
        image: response.image,
        category: response.category,
        duration: response.duration,
        userName: response.userName,
        cityName: response.cityName,
        state: response.state,
        country: response.country,
        dataSource: this.state.dataSource.cloneWithRows(places),
        isLoading: false
      });
    })
    .done();
  }

  renderPlace (place) {
    var imageURI = (typeof place.image !== 'undefined') ? place.image : '';
    return (
      <TouchableHighlight 
        onPress={ utils.navigateTo.bind(this, place.placeName, PlaceDetail, {place}) }  
        underlayColor='#dddddd'>
        <View>
        <View style={ styles.tourSeparator } />
          <View style={ styles.placeContainer }>
            <View>
              <Image source={{uri: imageURI }} style={styles.thumbnail}/>
            </View>
            <View style={ styles.rightContainer }>
              <Text style={ styles.placeName }>{ place.placeName}</Text>
              <Text style={ styles.address }>{ place.address}</Text>
            </View>
            <Image source={require('../assets/arrow.png')} style={styles.arrow}></Image>
          </View>
            
          <View style={ styles.tourSeparator } />
        </View>
      </TouchableHighlight>
    );
  }

  renderEditablePlace (place) {
    console.log('renderEditablePlace reached, place: ', place);
    return (
      <View>
        <View style={ styles.placeContainer }>
          <TouchableHighlight style={ styles.deleteContainer } onPress={ this.deletePlace.bind(this, place) }>
            <Text style={ styles.deleteText }>Delete</Text>
          </TouchableHighlight>
          <TouchableHighlight style={ styles.rightContainer } onPress={ utils.navigateTo.bind(this,place.placeName, EditPlace, {place}) }>
            <Text style={ styles.placeName }>{ place.placeName }</Text>
          </TouchableHighlight>
        </View>
        <View style={ styles.separator } />
      </View>
    );    
  }

  renderEditMode() {
    return (
      <View style={styles.container}>
        
        <View style={ styles.inputs }>
        
          <View style={ styles.editContainer }>
            <TextInput
              style={ [styles.editInput] }
              placeholder={ this.state.tour.tourName }
              placeholderTextColor="black"
              value={ this.state.tourName }
              onChange={ utils.tourNameInput.bind(this) }/>              
          </View>
         
          <View style={ styles.editContainer }>
            <TextInput
              style={ [styles.editInput] }
              placeholder={ this.state.tour.category }
              placeholderTextColor="black"
              value={ this.state.category }
              onChange={ utils.categoryInput.bind(this) }/>
          </View>
          
          <View style={ styles.editContainer }>
            <TextInput
              style={ [styles.editInput] }
              placeholder={ this.state.tour.description }
              placeholderTextColor="black"
              value={this.state.description}
              onChange={ utils.descriptionInput.bind(this) }/>
          </View>
          
          <View style={ styles.editContainer }>
            <TextInput
              style={ [styles.editInput] }
              placeholder={ this.state.tour.duration }
              placeholderTextColor="black"
              value={ this.state.duration }
              onChange={ utils.durationInput.bind(this) }/>
          </View>

          <View style={ styles.editContainer }>
            <TextInput
              style={ [styles.editInput] }
              placeholder={ this.state.tour.cityName }
              placeholderTextColor="black"
              value={ this.state.cityName }
              onChange={ utils.cityNameInput.bind(this) }/>
          </View>

          <View style={ styles.editContainer }>
            <TextInput
              style={ [styles.editInput] }
              placeholder={ this.state.tour.state }
              placeholderTextColor="black"
              value={ this.state.state }
              onChange={ utils.stateInput.bind(this) }/>
          </View>

          <View style={ styles.editContainer }>
            <TextInput
              style={ [styles.editInput] }
              placeholder={ this.state.tour.country }
              placeholderTextColor="black"
              value={ this.state.country }
              onChange={ utils.countryInput.bind(this) }/>
          </View>
          <TouchableHighlight
            onPress={ this.addPhoto.bind(this) }
            style={ styles.touchable } underlayColor="white">
            <View style={ styles.addPlaceBtn }>
              <Text style={ styles.whiteFont }>Edit Photo</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={ styles.panel }>
          <ListView
            dataSource={ this.state.dataSource }
            renderRow={ this.renderEditablePlace.bind(this) }
            style={ styles.listView }/>
        </View>
        
        {/*
          <TouchableHighlight 
            onPress={ this.addPlace.bind(this) } 
            style={ styles.touchable } underlayColor="white">
            <View style={ styles.addPlaceBtn }>
              <Text style={ styles.whiteFont }>Add Place</Text>
            </View>  
          </TouchableHighlight>
        */}


        <TouchableHighlight 
          onPress={ this.editDone.bind(this) } 
          style={ styles.touchable } underlayColor="white">
          <View style={ styles.doneBtn }>
            <Text style={ styles.whiteFont }>Done</Text>
          </View>
        </TouchableHighlight>
      
      </View>
    )
  }

  renderViewMode() {
    var imageURI = ( typeof this.state.tour.image !== 'undefined' ) ? this.state.tour.image : '';
    return (
      <View style={ styles.tourContainer }>
        
        <View><Image style={ styles.headerPhoto } source={{ uri: imageURI }} /></View>

        <View style={{flexDirection: 'row'}}>
          <View style={{marginLeft: 20}}>
            <Text style={ styles.tourTitle }>{ this.state.tour.tourName }</Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>Description: </Text>{this.state.tour.description + '\n'}
              <Text style={ styles.bold }>City: </Text>{ this.state.tour.cityName + '\n' }
              <Text style={ styles.bold }>Duration: </Text>{ this.state.tour.duration + '\n' }
              <Text style={ styles.bold }>Category: </Text>{ this.state.tour.category + '\n' }
            </Text>
          </View>

          <View style={styles.editIconContainer}>
            <TouchableHighlight
              onPress={ this.toggleEdit.bind(this) }
              style={ styles.touchable } underlayColor="white">
              <View>
                <Image source={require('../assets/editiconteal.png')} style={styles.editIcon}/>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <TouchableHighlight 
          onPress={ this.addPlace.bind(this) } 
          underlayColor='#727272' 
          style={{ marginBottom: 20 }}>
            <View style={ styles.photoAudioContainer }>
              <View>
                <Text style={ styles.text }>Add Place</Text>
              </View>
              <View>
                <Image source={ require('../assets/editiconteal.png') } style={ styles.addPlaceIcon }/>
              </View>
            </View>  
          </TouchableHighlight>
        <View style={ styles.panel }>
          <ListView
            dataSource={ this.state.dataSource }
            renderRow={ this.renderPlace.bind(this) }
            style={ styles.listView }
            automaticallyAdjustContentInsets={false} />
        </View>

      </View>
    );
  }

  render () {
    if(this.state.editMode) {
      return this.renderEditMode();
    } else {
      return this.renderViewMode();
    }
  }
};

// var styles = StyleSheet.create({

//   container: {
//     flexDirection: 'column',
//     flex: 1,
//     backgroundColor: 'transparent',
//     marginTop: 70
//   },
//   panel: {
//     backgroundColor: '#fff2f2',
//     flex: 1,
//     padding: 10,
//     marginTop: 100
//   },
//   placeContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff2f2',
//     padding: 10
//   },
//   rightContainer: {
//     flex: 1
//   },
//   placeName: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   deleteContainer: {
//     flex: 1
//   },
//   deleteText: {
//     fontSize: 12,
//     marginBottom: 8
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#dddddd'
//   },
//   description: {
//     padding: 10,
//     fontSize: 15,
//     color: '#656565',
//   },
//   addPlaceBtn: {
//     backgroundColor: '#FF3366',
//     padding: 20,
//     alignItems: 'center',
//     marginBottom: 50,
//   },
//   editBtn: {
//     backgroundColor: '#FF3366',
//     padding: 20,
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   doneBtn: {
//     backgroundColor: '#FF3366',
//     padding: 20,
//     alignItems: 'center',
//     marginTop: -40,
//   },
//   whiteFont: {
//     color: '#FFF'
//   },
//   listView: {
//     backgroundColor: '#fff2f2'
//    },
//   touchable: {
//     borderRadius: 100
//   },
//   inputs: {
//     marginTop: 25,
//     marginBottom: 10,
//     flex: .25
//   },
//   inputContainer: {
//     padding: 10,
//     borderWidth: 1,
//     borderBottomColor: 'black',
//     borderColor: 'transparent'
//   },
//   input: {
//     position: 'absolute',
//     left: 10,
//     top: 4,
//     right: 0,
//     height: 20,
//     fontSize: 14
//   }
// });
//
//  container: {
//    flexDirection: 'column',
//    flex: 1,
//    backgroundColor: 'transparent',
//    marginTop: 70
//  },
//  panel: {
//    backgroundColor: '#fff2f2',
//    flex: 1,
//    padding: 10,
//    marginTop: 100
//  },
//  placeContainer: {
//    flex: 1,
//    flexDirection: 'row',
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: '#fff2f2',
//    padding: 10
//  },
//  rightContainer: {
//    flex: 1
//  },
//  placeName: {
//    fontSize: 14,
//    marginBottom: 8,
//  },
//  deleteContainer: {
//    flex: 1
//  },
//  deleteText: {
//    fontSize: 12,
//    marginBottom: 8
//  },
//  separator: {
//    height: 1,
//    backgroundColor: '#dddddd'
//  },
//  description: {
//    padding: 10,
//    fontSize: 15,
//    color: '#656565',
//  },
//  addPlaceBtn: {
//    backgroundColor: '#FF3366',
//    padding: 20,
//    alignItems: 'center',
//    marginBottom: 80,
//  },
//  editBtn: {
//    backgroundColor: '#FF3366',
//    padding: 20,
//    alignItems: 'center',
//    marginBottom: 25,
//  },
//  doneBtn: {
//    backgroundColor: '#FF3366',
//    padding: 20,
//    alignItems: 'center',
//    marginBottom: 40,
//  },
//  whiteFont: {
//    color: '#FFF'
//  },
//  listView: {
//    backgroundColor: '#fff2f2'
//   },
//  touchable: {
//    borderRadius: 100
//  },
//  inputs: {
//    marginTop: 25,
//    marginBottom: 10,
//    flex: .25
//  },
//  inputContainer: {
//    padding: 10,
//    borderWidth: 1,
//    borderBottomColor: 'black',
//    borderColor: 'transparent'
//  },
//  input: {
//    position: 'absolute',
//    left: 10,
//    top: 4,
//    right: 0,
//    height: 20,
//    fontSize: 14
//  },
//  headerPhoto: {
//    backgroundColor: 'transparent',
//    height: 150
//  }
//});

module.exports = ViewCreatedTour;
