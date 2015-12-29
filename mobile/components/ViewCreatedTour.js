'use strict';

var React = require('react-native');
// var MyTours = require('./MyTours');
var utils = require('../lib/utility');
var style = require('../lib/stylesheet');
var PlaceDetail = require('./PlaceDetail.js');
var EditPlace = require('./EditPlace.js');
var styles = require('../lib/stylesheet');
var SelectImage = require('./SelectImage');
var t = require('tcomb-form-native');
var Form = t.form.Form;

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

var EditTour = t.struct({
  tourName: t.maybe(t.String),
  category: t.maybe(t.String),
  description: t.maybe(t.String),
  duration: t.maybe(t.String),
  cityName: t.maybe(t.String),
  state: t.maybe(t.String),
  country: t.maybe(t.String),
});

var options = {
  auto: 'placeholders',
  fields: {
    tourName: {
      // placeholder: this.state.tour.tourName,
      placeholderTextColor: '#FFF',
    },
    category: {
      // placeholder: this.state.tour.category,
      placeholderTextColor: '#FFF'
    },
    description: {
      // placeholder: this.state.tour.description,
      placeholderTextColor: '#FFF'
    },
    duration: {
      // placeholder: this.state.tour.duration,
      placeholderTextColor: '#FFF',
    },
    cityName: {
      // placeholder: this.state.tour.cityName,
      placeholderTextColor: '#FFF',
    },
    state: {
      // placeholder: this.state.tour.state,
      placeholderTextColor: '#FFF',
    },
    country: {
      // placeholder: this.state.tour.country,
      placeholderTextColor: '#FFF',
    },
  },
};

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
      tourId: this.props.tourId || this.props.route.passProps.tourId || this.props.route.passProps.tour.id,
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
  componentDidMount() {
    this.fetchData();
  }

  // componentWillReceiveProps(nextProps) {

  //   var that = this;
  //   setTimeout(function () {
  //     console.log('refetching')
  //     that.fetchData();
  //   }, 5000)

  // }

  addPlace() {
    var tourId = this.state.tourId;
    var AddPlace = require('./AddPlace');
    utils.navigateTo.call(this, "Add Place", AddPlace, {tourId});
  }

  addPhoto() {
    /*TODO: this should send a put request to update tour photo*/
    var tourId = this.state.tourId;
    utils.navigateTo.call(this, "Select a Tour Photo", SelectImage, {tourId});
  }

  onPressDone() {
    var MyTours = require('./MyTours');
    var userId = this.state.tour.userId;
    utils.navigateTo.call(this, "My Tours", MyTours, {userId});
  }

  onChange(value) {
    this.setState(value);
  }

  toggleEdit() {
    var newEditState = !this.state.editMode;
    this.setState({editMode: newEditState});
    console.log("Edit Mode: ", this.state.editMode);
  }

  editDone() {
    console.log('state in view ViewCreatedTours', this.state)
    var value = this.refs.form.getValue();
    var options = {
      reqBody: this.state,
      reqParam: this.state.tourId
    };
    var component = this;
    utils.makeRequest('editTour', component, options)
    .then(response => {
      console.log('Response body from server after Editing a Tour: ', response);
      this.setState({editMode: false});
      this.fetchData();
      this.onPressDone();
    });
  }

  deletePlace(place) {
    var component = this;
    var options = {
      reqBody: place,
      reqParam: place.id
    };

    utils.makeRequest('deletePlace', component, options)
      .then(response => {
        console.log('Response body from server after deleting a place: ', response);
        this.fetchData();
      });
  }

  fetchData() {
    var component = this;
    var options = {
      reqParam: this.state.tourId,
      reqBody: {}
    }; 

    console.log('tourId: ', this.state.tourId);
    console.log('this.props: ', this.props);
    utils.makeRequest('tour', component, options)
    .then((response) => {
      console.log('response body from View Created Tour: ', response);
      var places = response.places;
      component.setState({
        tour: response,
        userId: response.userId,
        tourName: response.tourName,
        description: response.description,
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

  renderPlace(place) {
    var imageURI = (typeof place.image !== 'undefined') ? place.image : '';
    return (
      <TouchableHighlight
        onPress={ utils.navigateTo.bind(this, place.placeName, PlaceDetail, {place}) }
        underlayColor='#dddddd'>
        <View>
          <View style={ styles.tourSeparator }/>
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

          <View style={ styles.tourSeparator }/>
        </View>
      </TouchableHighlight>
    );
  }

  renderEditablePlace(place) {
    console.log('renderEditablePlace reached, place: ', place);
    return (
      <View>
        <View style={ styles.placeContainer }>
          <TouchableHighlight style={ styles.deleteContainer } onPress={ this.deletePlace.bind(this, place) }>
            <Text style={ styles.deleteText }>Delete</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={ styles.rightContainer } 
            onPress={ utils.navigateTo.bind(this,place.placeName, EditPlace, {place}) }>
            <Text style={ styles.placeName }>{ place.placeName }</Text>
          </TouchableHighlight>
        </View>
        <View style={ styles.tourSeparator }/>
      </View>
    );
  }

  renderEditMode() {
    var options = {
      auto: 'placeholders',
      fields: {
        tourName: {
          placeholder: this.state.tour.tourName,
          placeholderTextColor: '#FFF',
        },
        category: {
          placeholder: this.state.tour.category,
          placeholderTextColor: '#FFF'
        },
        description: {
          placeholder: this.state.tour.description,
          placeholderTextColor: '#FFF'
        },
        duration: {
          placeholder: this.state.tour.duration,
          placeholderTextColor: '#FFF',
        },
        cityName: {
          placeholder: this.state.tour.cityName,
          placeholderTextColor: '#FFF',
        },
        state: {
          placeholder: this.state.tour.state,
          placeholderTextColor: '#FFF',
        },
        country: {
          placeholder: this.state.tour.country,
          placeholderTextColor: '#FFF',
        },
      },
    };

    return (

      <View style={ styles.addPlaceContainer }>
        
        <View style={{marginTop: 60}}>
          <Form
            ref="form"
            type={ EditTour }
            options={ options }
            value={ this.state.value }
            onChange={this.onChange.bind(this)}/>
        </View>

        <TouchableHighlight onPress={() => alert('editMode photo')} underlayColor='#727272' style={{marginTop: -2}}>
          <View style={ [styles.photoAudioContainer, {marginTop: 5}] }>   
            <View style={{marginTop: 5}}>
              <Text style={ [styles.text, {fontSize: 16}] }>Edit Photo</Text>
            </View>
            <View>
              <Image source={require('../assets/photoicon.png')} 
                style={[styles.photoIcon, {marginTop: -2}, {marginLeft: 15}, {width: 35}, {height: 35}]}/> 
            </View>
          </View>   
        </TouchableHighlight>

        <View style={ [styles.panel, {marginTop: 15}] }>
        <View style={ styles.tourSeparator }/>
          <ListView
            dataSource={ this.state.dataSource }
            renderRow={ this.renderEditablePlace.bind(this) }
            style={ styles.listView }/>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableHighlight 
            style={ [styles.button, {marginTop: 10}, {height: 30}, {width: 100}, {borderRadius: 9}] } 
            onPress={ this.editDone.bind(this) } 
            underlayColor='#FFC107'>
            <Text style={ styles.buttonText }>Done</Text>
          </TouchableHighlight>
        </View>
      </View>
      
    )
  }

  renderViewMode() {
    var imageURI = ( typeof this.state.tour.image !== 'undefined' ) ? this.state.tour.image : '';
    return (
      <View style={ styles.tourContainer }>

        <ScrollView automaticallyAdjustContentInsets={false}>
          <Image style={ styles.headerPhoto } source={{ uri: imageURI }}/>
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
              automaticallyAdjustContentInsets={false}/>
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    if (this.state.editMode) {
      return this.renderEditMode();
    } else {
      return this.renderViewMode();
    }
  }
};

module.exports = ViewCreatedTour;

{/*<View style={styles.container}>

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

        <TouchableHighlight
          onPress={ this.editDone.bind(this) }
          style={ styles.touchable } underlayColor="white">
          <View style={ styles.doneBtn }>
            <Text style={ styles.whiteFont }>Done</Text>
          </View>
        </TouchableHighlight>

      </View>*/}
