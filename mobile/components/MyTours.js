'use strict';
 
var React = require('react-native');
var TourDetail = require('./TourDetail');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet');
var CreateTour = require('./CreateTour');
var ViewCreatedTour = require('./ViewCreatedTour');

var {
  Image,
  StyleSheet,
  Text,
  View,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage
 } = React;
 
class MyTours extends Component {

  /**
   * Creates an instance of MyTours.
   * The DataSource is an interface that ListView uses to determine which rows have changed over the course of updates. ES6 constructor is an analog of getInitialState.
   * @constructor
   * @this {MyTours}
   */
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      editMode: this.props.editMode || false
    };
  }

  /**
   * ComponentDidMount function is called as soon as the render method is executed.
   * It fetches data from the database and sets the state with the fetched data.
   */
  componentDidMount () {
    this.fetchData();

  }

  /**
   * This will rerender changes from edit mode
   * @param nextProps
	 */
  componentWillReceiveProps (nextProps) {
    this.fetchData();
  }

  toggleEdit () {
    alert('in toggleEdit')
    var newEditState = !this.state.editMode;
    this.setState({editMode: newEditState});
    console.log("Edit Mode: ", this.state.editMode);
    this.fetchData();
  }

  /**
   * Makes GET request to server for tours from a specific user and sets the places array from DB to the state.
   *
   */
  fetchData() {
    var component = this;
    utils.makeRequest('myTours', component, {})
    .then((response) => {
      console.log('response body from MyTours: ', response);
      var tours = response;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tours),
        isLoading: false
      });
    })
    .done();
  }

  createTour() {
    utils.navigateTo.call(this, "Create Tour", CreateTour, {});
  }

  deleteTour(tour) {
    console.log(tour);
    var options = {
      reqBody: tour,
      reqParam: tour.id
    };
    var component = this;
    utils.makeRequest('deleteTour', component, options)
      .then(response => {
        console.log('Response body from server after deleting a tour: ', response);
        utils.makeRequest('myTours', component, {})
        .then((response) => {
          console.log('response body from MyTours: ', response);
          var tours = response;
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(tours),
            isLoading: false
          });
        })
      })
    })
    this.fetchData();
  }

  renderLoadingView () {
    return (
      <View style={ styles.loading }>
        <ActivityIndicatorIOS
          size='large'/>
        <Text>
          Loading tours...
        </Text>
      </View>
    );
  }

  renderDeletableTour(tour) {
    console.log('Rendering Deletable Tour');
    return (
      <View>
        <View style={ styles.tourContainer }>
          <TouchableHighlight style={ styles.deleteContainer } onPress={ this.deleteTour.bind(this, tour) }>
            <Text style={ styles.deleteText }>Delete</Text>
          </TouchableHighlight>
          <View style={ styles.rightContainer }>
            <Image source={{ uri: tour.image }} style={ styles.thumbnail } />
            <View style={ styles.rightContainer }>
              <Text style={ styles.title }>{ tour.tourName }</Text>
              <Text style={ styles.city }>{ tour.cityName }</Text>
            </View>
          </View>
        </View>
        <View style={ styles.separator } />
      </View>
    );
  }

  renderTour(tour) {
    return (
      <TouchableHighlight 
        onPress={ utils.navigateTo.bind(this, tour.tourName, ViewCreatedTour, {tour}) }>
        <View>
          <View>
            <Image source={{ uri: tour.image }} style={ styles.tourPhoto } >
              <Text style={ styles.title }>{ tour.tourName }</Text>
              <Text style={ styles.city }>{ tour.cityName }</Text>
            </Image>
          <View style={ styles.separator } />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderEditMode() {
    return (
      <View style={ [styles.container, {marginTop: 65}] }>
        <View style={ styles.panel }>
          <ListView
            dataSource={ this.state.dataSource }
            renderRow={ this.renderDeletableTour.bind(this) }
            style={ styles.listView }/>
        </View>

        <TouchableHighlight 
          onPress={ this.toggleEdit.bind(this) } 
          style={ styles.touchable }>
          <View style={ styles.doneBtn }>
            <Text style={ styles.whiteFont }>Done</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  renderViewMode() {
    {/*this.fetchData();*/}
    return (
      <View style={ [styles.container, {marginTop: 65}] }>

        <View style={ styles.panel }>
          <ListView
            dataSource={ this.state.dataSource }
            renderRow={ this.renderTour.bind(this) }
            style={ styles.listView }/>
        </View>
      </View>
    );
  }

  render () {
    if(this.state.isLoading) {
      return this.renderLoadingView();
    }
    if(this.state.editMode) {
      return this.renderEditMode();
    } else {
      return this.renderViewMode();
    }
  }  
};
 
module.exports = MyTours;
