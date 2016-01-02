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
  Text,
  View,
  Component,
  ListView,
  TouchableHighlight
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

  //navToTour (title, toComponent, props) {
  //  console.log('these are the props', props)
  //  var component = this;
  //  component.props.navigator.push({
  //    title: title,
  //    component: toComponent,
  //    props: props,
  //    rightButtonTitle: 'Edit',
  //    onRightButtonPress: () => {
  //      console.log('right button pressed')
  //      this.props.navigator.push({
  //        title: "Edit Tour from My Tours",
  //        component: ViewCreatedTour,
  //        passProps: { editMode: true,
  //            tourId: props.tour.id }
  //      });}
  //  })
  //}

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
    // this.fetchData();
  }

  renderDeletableTour(tour) {
    console.log('Rendering Deletable Tour');
    return (
      <View>
        <View style={ [styles.tourContainer, {flexDirection: 'row'}] }>
          <View style={ styles.deleteContainer }>
            <TouchableHighlight 
              style={{marginTop: 30}} 
              onPress={ this.deleteTour.bind(this, tour) }
                underlayColor='#727272'>
              <Image 
                source={ require('../assets/deleteicon.png') } 
                style={ [styles.addPlaceIcon, {width: 25}, {height: 25}, {marginTop: 30}] }/>
            </TouchableHighlight>
          </View>
          <View style={ styles.rightContainer }>
            <Image source={{ uri: tour.image }} style={ styles.tourPhoto }>
                <Text style={ styles.title }>{ tour.tourName }</Text>
                <Text style={ styles.city }>{ tour.cityName }</Text>
            </Image>
          </View>
        </View>
        <View style={ styles.separator } />
      </View>
    );
  }

  renderTour(tour) {
    return (
      <TouchableHighlight 
        onPress={ utils.myTourNavigateTo.bind(this, tour.tourName, ViewCreatedTour, {tour}) }>
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
      <ListView
        dataSource={ this.state.dataSource }
        renderRow={ this.renderDeletableTour.bind(this) }
        style={ styles.listView }/>
        
    );
  }

  renderViewMode() {
    return (
      <View style={ styles.container }>

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
