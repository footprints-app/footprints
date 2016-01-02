'use strict';

var React = require('react-native');
// var MyTours = require('./MyTours');
var utils = require('../lib/utility');
var PlaceDetail = require('./PlaceDetail.js');
var EditPlace = require('./EditPlace.js');
var styles = require('../lib/stylesheet');
var SelectImage = require('./SelectImage');
var t = require('tcomb-form-native');
var Form = t.form.Form;
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
var formStyles = require('../lib/formStyleEditMode');

var {
  Image,
  View,
  Text,
  Component,
  ListView,
  TouchableHighlight,
  ScrollView
  } = React;

var EditTour = t.struct({
  tourName: t.maybe(t.String),
  description: t.maybe(t.String),
  duration: t.maybe(t.Number)
});

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
      tour: {places: []},
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
      duration: 0,
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

  addPlace() {
    var tourId = this.state.tourId;
    var AddPlace = require('./AddPlace');
    utils.navigateTo.call(this, "Add Place", AddPlace, {tourId});
  }

  addPhoto() {
    var tourId = this.state.tourId;
    utils.navigateTo.call(this, "Select a Tour Photo", SelectImage, {tourId});
  }

  onPressDone() {
    var MyTours = require('./MyTours');
    var userId = this.state.tour.userId;
    // utils.navigateTo.call(this, "My Tours", MyTours, {userId});
    utils.myTourNavigateTo.call(this, "My Tours", ViewCreatedTours, {userId});
    // this.props.navigator.push({component: ViewCreatedTours, passProps: {userId}});
  }

  onChange(value) {
    this.setState(value);
  }

  toggleEdit() {
    var newEditState = !this.state.editMode;
    this.setState({editMode: newEditState});
  }

  editDone(callback) {
    console.log('state in view ViewCreatedTours', this.state)
    var value = this.refs.form.getValue();
    var options = {
      reqBody: this.state,
      reqParam: this.state.tourId
    };
    var component = this;
    utils.makeRequest('editTour', component, options)
    .then(response => {
      this.setState({editMode: false});
      this.fetchData();
      if(callback) {
        callback()
      } else {
        this.onPressDone();
      }
    });
  }

  putThenEditPlace (title, toComponent, props) {
    var component = this;
    this.editDone(function() {
      utils.myTourNavigateTo.call(component, title, toComponent, props);
    })
  }

  deletePlace(place) {
    var component = this;
    var options = {
      reqBody: place,
      reqParam: place.id
    };

    utils.makeRequest('deletePlace', component, options)
    .then(response => {
      this.fetchData();
    });
  }

  fetchData() {
    var component = this;
    var options = {
      reqParam: this.state.tourId,
      reqBody: {}
    };

    utils.makeRequest('tour', component, options)
    .then((response) => {
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
    var imageURI = (typeof place.image !== 'undefined') ? place.image : null;
    return (
      <TouchableHighlight
        onPress={ utils.navigateTo.bind(this, place.placeName, PlaceDetail, {place}) }
        underlayColor='#727272'>
        <View>
          <View style={ styles.placeContainer }>
            <View>
              <Image source={{uri: imageURI }} style={ styles.thumbnail }/>
            </View>
            <View style={ styles.rightContainer }>
              <Text style={ styles.placeName }>{ place.placeOrder + ' | ' + place.placeName }</Text>
              <Text style={ styles.address }>{ place.address.split(',')[0] }</Text>
            </View>
            <Image source={ require('../assets/arrow.png') } style={ styles.arrow }></Image>
          </View>

          <View style={ styles.tourSeparator }/>
        </View>
      </TouchableHighlight>
    );
  }

  renderEditablePlace(place) {
    return (
      <View>
        <View style={ styles.placeContainer }>
          <TouchableHighlight 
            style={ styles.deleteContainer } 
            onPress={ this.deletePlace.bind(this, place) }
            underlayColor='#727272'>
            <Image source={ require('../assets/deleteicon.png') } style={ {width: 15, height: 15} }/>
          </TouchableHighlight>

          <TouchableHighlight
            style={ styles.rightContainer }
            onPress={ this.putThenEditPlace.bind(this, place.placeName, EditPlace, {place}) }
            underlayColor='#727272'>
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
          placeholder: this.state.tourName,
          placeholderTextColor: '#808080',
          label: 'Tour Name'
        },
        description: {
          placeholder: this.state.description,
          placeholderTextColor: '#808080',
          label: 'Description'
        },
        duration: {
          placeholder: this.state.duration.toString(),
          placeholderTextColor: '#808080',
          label: 'Estimated Time (in hours)'
        },
      },
      stylesheet: formStyles
    };

    return (

      <View style={ styles.addPlaceContainer }>
        <View style={{ marginTop: 60 }}>
          <Form
            ref="form"
            type={ EditTour }
            options={ options }
            value={ this.state.value }
            onChange={ this.onChange.bind(this) }/>
        </View>
        <Text style={{ fontSize: 15, color: '#999999', fontWeight: '500', marginBottom: 2 }}>
          City
        </Text>
        <GooglePlacesAutocomplete
          placeholder={this.state.tour.cityName}
          placeholderTextColor='#808080'
          minLength={3} // minimum length of text to search 
          autoFocus={false}
          fetchDetails={true}
          onPress={ (data, details = null) => { // 'details' is provided when fetchDetails = true 
            this.setState({ cityName: details.formatted_address });
          }}
          styles={ utils.googlePlacesStyles }
          getDefaultValue={() => { return ''; }}// text input default value 
          query={{ key: 'AIzaSyBpYCMNdcQg05gC87GcQeEw866rHpA9V1o', language: 'en' }} // language of the results  
          GooglePlacesSearchQuery={{ rankby: 'distance' }}/>
        <ScrollView>
        <TouchableHighlight 
          onPress={ this.addPhoto.bind(this) } 
          underlayColor='#727272' 
          style={{ marginTop: -2 }}>
          <View style={ [styles.photoAudioContainer, {marginTop: 5}] }>
            <View style={{ marginTop: 17 }}>
              <Text style={ [styles.text, {fontSize: 15}] }>Edit Photo</Text>
            </View>
            <View>
              <Image source={ require('../assets/photoicon.png') }
                     style={ [styles.photoIcon, {marginLeft: 15}, {width: 25}, {height: 25}] }/>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={ this.addPlace.bind(this) }
            style={ [styles.touchable, {marginTop: 1}] }
            underlayColor='#727272'>
            <View style={ [styles.photoAudioContainer, {marginTop: 5}] }>
              <View style={{ marginTop: 17 }}>
                <Text style={ [styles.text, {fontSize: 15}] }>Add Stop</Text>
              </View>
              <View>
                <Image source={ require('../assets/addplaceicon.png') }
                       style={ [styles.editIcon, {width: 25}, {height: 25}, {marginLeft: 15}] } />
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
        </ScrollView>

        <View>
          {/*<TouchableHighlight
                      style={ [styles.button, {marginTop: 10}, {height: 30}, {width: 100}, {borderRadius: 9}] }
                      onPress={ this.editDone.bind(this) }
                      underlayColor='#FFC107'>
                      <Text style={ styles.buttonText }>Done</Text>
                    </TouchableHighlight>*/}
          <TouchableHighlight 
            style={ [styles.button, {marginBottom: 35}, {padding: 5}, {marginTop: 10}, {borderRadius: 15}] } 
            onPress={ this.editDone.bind(this) } 
            underlayColor='#FFC107'>
            <Text style={ styles.buttonText }>Done</Text>
          </TouchableHighlight>
        </View>


      </View>

    )
  }

  renderViewMode() {
    var imageURI = ( typeof this.state.tour.image !== 'undefined' ) ? this.state.tour.image : null;
    return (
      <View style={ styles.tourContainer }>
        <ScrollView automaticallyAdjustContentInsets={false}>
          <Image style={ styles.headerPhoto } source={{ uri: imageURI }}>
            <View style={{ marginRight: 10, alignItems: 'flex-end' }}>
              <TouchableHighlight
                onPress={ this.toggleEdit.bind(this) }
                style={ [styles.touchable, {marginBottom: 10}] }
                underlayColor='transparent'>
                <Image source={ require('../assets/editiconteal.png') }
                       style={ [styles.editIcon, {width: 45}, {height: 45}, {marginTop: 10}] } />
              </TouchableHighlight>
            </View>
          </Image>
          <View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignSelf: 'center' }}>
              <View>
                <Text style={ [styles.tourTitle, {alignSelf: 'center'}, {fontSize: 21}] }>
                  { this.state.tour.tourName }
                </Text>
              </View>
            </View>

            <View style={{ justifyContent: 'center' }}>
              <Text style={ [styles.description, {marginRight: 10}] }>
                <Text style={ styles.bold }>Description: </Text>{ this.state.tour.description + '\n' }
                <Text style={ styles.bold }>City: </Text>{ this.state.tour.cityName + '\n' }
                <Text style={ styles.bold }>Est Time: </Text>{ this.state.tour.duration + ' hours (' + this.state.tour.places.length + ' stops)' }
              </Text>
            </View>
          </View>

          <View style={ [styles.photoAudioContainer, {marginTop: 5}, {marginBottom: 3}] }>
            <View style={{ marginTop: 5 }}>
              <Text style={ styles.text }>Places</Text>
            </View>
          </View>

          <View style={ styles.tourSeparator }/>

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
