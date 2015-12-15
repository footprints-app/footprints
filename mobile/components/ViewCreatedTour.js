'use strict';

var React = require('react-native');
// var MyTours = require('./MyTours');
var utils = require('../lib/utility');
var PlaceDetail = require('./PlaceDetail.js');

var {
  StyleSheet,
  Image,
  View,
  Text,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  TextInput
} = React;

class ViewCreatedTour extends Component {
  /**
   * Creates an instance of ViewCreatedTour.
   * ListView uses DataSource interface to determine which rows have changed over the course of updates.
   * @this {ViewCreatedTours}
   */
  constructor(props) {
    super(props);
    this.state = {
      tourId: this.props.tourId || this.props.tour.id,
      tour: {},
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      editMode: false
    };
  }
  /**
   * ComponentDidMount function is called as soon as the render method is executed.
   * It fetches data from the database and sets the state with the fetched data.
   */
  componentDidMount () {
    this.fetchData();
  }

  addPlace () {
    var tourId = this.state.tourId;
    var AddPlace = require('./AddPlace');
    utils.navigateTo.call(this, "Add Place", AddPlace, {tourId});
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

  fetchData() {
    utils.makeRequest('tour', {}, this.state.tourId)
    .then((response) => {
      console.log('response body from View Created Tour: ', response);
      var places = response.places;
      this.setState({
        tour: response,
        dataSource: this.state.dataSource.cloneWithRows(places),
        isLoading: false
      });
    })
    .done();
  }

  renderPlace (place) {
    return (
      <TouchableHighlight onPress={ utils.navigateTo.bind(this,place.placeName, PlaceDetail, {place}) }  underlayColor='#dddddd'>
        <View>
          <View style={ styles.placeContainer }>
            <View style={ styles.rightContainer }>
              <Text style={ styles.placeName }>{ place.placeName }</Text>
            </View>
          </View>
          <View style={ styles.separator } />
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    console.log('View Created Tour is rendering...');
    
    if(this.state.editMode) {
      console.log("editMode is true", this.state.editMode);
      return (
        <View style={styles.container}>
          
          <View style={ styles.inputs }>
          
            <View style={ styles.inputContainer }>
              <TextInput
                style={ [styles.input, styles.whiteFont] }
                placeholder="Tour Name"
                placeholderTextColor="black"
                value={ this.state.tourName }
                onChange={ utils.tourNameInput.bind(this) }/>
            </View>
           
            <View style={ styles.inputContainer }>
              <TextInput
                style={ [styles.input, styles.whiteFont] }
                placeholder="Category"
                placeholderTextColor="black"
                value={ this.state.category }
                onChange={ utils.categoryInput.bind(this) }/>
            </View>
            
            <View style={ styles.inputContainer }>
              <TextInput
                style={ [styles.input, styles.whiteFont] }
                placeholder="Description"
                placeholderTextColor="black"
                value={this.state.description}
                onChange={ utils.descriptionInput.bind(this) }/>
            </View>
            
            <View style={ styles.inputContainer }>
              <TextInput
                style={ [styles.input, styles.whiteFont] }
                placeholder="Duration"
                placeholderTextColor="black"
                value={ this.state.duration }
                onChange={ utils.durationInput.bind(this) }/>
            </View>

            <View style={ styles.inputContainer }>
              <TextInput
                style={ [styles.input, styles.whiteFont] }
                placeholder="City"
                placeholderTextColor="black"
                value={ this.state.cityName }
                onChange={ utils.cityNameInput.bind(this) }/>
            </View>

            <View style={ styles.inputContainer }>
              <TextInput
                style={ [styles.input, styles.whiteFont] }
                placeholder="State"
                placeholderTextColor="black"
                value={ this.state.state }
                onChange={ utils.stateInput.bind(this) }/>
            </View>

            <View style={ styles.inputContainer }>
              <TextInput
                style={ [styles.input, styles.whiteFont] }
                placeholder="Country"
                placeholderTextColor="black"
                value={ this.state.country }
                onChange={ utils.countryInput.bind(this) }/>
            </View>

          </View>

          <View style={ styles.panel }>
            <ListView
              dataSource={ this.state.dataSource }
              renderRow={ this.renderPlace.bind(this) }
              style={ styles.listView }/>
          </View>

          <TouchableHighlight 
            onPress={ this.addPlace.bind(this) } 
            style={ styles.touchable } underlayColor="white">
            <View style={ styles.addPlaceBtn }>
              <Text style={ styles.whiteFont }>Add Place</Text>
            </View>  
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.onPressDone.bind(this) } 
            style={ styles.touchable } underlayColor="white">
            <View style={ styles.doneBtn }>
              <Text style={ styles.whiteFont }>Done</Text>
            </View>  
          </TouchableHighlight>
        
        </View>
      )
    } else {

      return (
        <View style={styles.container}>
          
          <Text style={ styles.description }>Tour Name: { this.state.tour.tourName }</Text>
          <Text style={ styles.description }>Category : { this.state.tour.category }</Text>
          <Text style={ styles.description }>Duration: { this.state.tour.duration }</Text>
          <Text style={ styles.description }>City Name: { this.state.tour.cityName }   State: { this.state.tour.state }   Country: { this.state.tour.country }</Text> 
          <Text style={ styles.description }>Places: </Text>

          <View style={ styles.panel }>
            <ListView
              dataSource={ this.state.dataSource }
              renderRow={ this.renderPlace.bind(this) }
              style={ styles.listView }/>
          </View>

          <TouchableHighlight
            onPress={ this.toggleEdit.bind(this) }
            style={ styles.touchable } underlayColor="white">
            <View style={ styles.editBtn }>
              <Text style={ styles.whiteFont }>Edit Tour</Text>
            </View>  
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.addPlace.bind(this) } 
            style={ styles.touchable } underlayColor="white">
            <View style={ styles.addPlaceBtn }>
              <Text style={ styles.whiteFont }>Add Place</Text>
            </View>  
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={ this.onPressDone.bind(this) } 
            style={ styles.touchable } underlayColor="white">
            <View style={ styles.doneBtn }>
              <Text style={ styles.whiteFont }>Done</Text>
            </View>  
          </TouchableHighlight>
        
        </View>
      );

    }
  }
};

var styles = StyleSheet.create({

  container: { 
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 70
  },
  panel: {
    backgroundColor: '#fff2f2',
    flex: 1,
    padding: 10,
    marginTop: 150
  },
  placeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff2f2',
    padding: 10
  },
  rightContainer: {
    flex: 1
  },
  placeName: {
    fontSize: 14,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565',
  },
  addPlaceBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginBottom: 50,
  },
  editBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
  },
  doneBtn: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: -40,
  },
  whiteFont: {
    color: '#FFF'
  },
  listView: {
    backgroundColor: '#fff2f2'
   },
  touchable: {
    borderRadius: 100
  },
  inputs: {
    marginTop: 25,
    marginBottom: 10,
    flex: .25
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: 'black',
    borderColor: 'transparent'
  },
  input: {
    position: 'absolute',
    left: 10,
    top: 4,
    right: 0,
    height: 20,
    fontSize: 14
  }
});

module.exports = ViewCreatedTour;
