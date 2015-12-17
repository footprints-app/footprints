'use strict';
 
var React = require('react-native');
var TourDetail = require('./TourDetail');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var utils = require('../lib/utility');
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
      userId: null/*this.props.userId*/,
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
    /* Use this code for fake front end data */
    // var tours = FAKE_MY_TOUR_DATA;
    // this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(tours)
    // });

    /* Use this code to make actual API request to fetch data from database */
    var that = this;
    AsyncStorage.multiGet(['token', 'user'])
      .then(function(data) {
        if(data) {
          that.setState({
            token: data[0][1],
            userId: +data[1][1]
          });
        }
        that.fetchData()
      });

  }

  toggleEdit () {
    var newEditState = !this.state.editMode;
    this.setState({editMode: newEditState});
    console.log("Edit Mode: ", this.state.editMode);
  }

  /**
   * Makes GET request to server for tours from a specific user and sets the places array from DB to the state.
   *
   */
  fetchData() {
    console.log('userId in MyTours: ', this.state.userId);
    utils.makeRequest('myTours', {}, this.state.userId)
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
    var userId = this.state.userId;
    utils.navigateTo.call(this, "Create Tour", CreateTour, {userId});
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

  renderTour (tour) {
    return (
      <TouchableHighlight 
        onPress={ utils.navigateTo.bind(this, tour.tourName, ViewCreatedTour, {tour}) } 
        underlayColor='#dddddd'>
        <View>
          <View style={ styles.container }>
            <Image source={{ uri: tour.image }} style={ styles.thumbnail } />
            <View style={ styles.rightContainer }>
              <Text style={ styles.title }>{ tour.tourName }</Text>
              <Text style={ styles.city }>{ tour.cityName }</Text>
            </View>
          </View>
          <View style={ styles.separator } />
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <View>
        <ListView
          dataSource={ this.state.dataSource }
          renderRow={ this.renderTour.bind(this) }
          style={ styles.listView }/>
        
        <TouchableHighlight
          onPress={ this.toggleEdit.bind(this) }
          style={ styles.touchable } underlayColor="#FF3366">
          <View style={ styles.createTour }>
            <Text style={ styles.whiteFont }>Create Tour</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight 
          onPress={ this.createTour.bind(this) } 
          style={ styles.touchable } underlayColor="#FF3366">  
          <View style={ styles.createTour }>
            <Text style={ styles.whiteFont }>Create Tour</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }  
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff2f2',
    padding: 10
  },
  thumbnail: {
    width: 85,
    height: 81,
    marginRight: 10,
    marginTop: 10
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 20
  },
  city: {
    color: '#656565',
    marginLeft: 20
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  listView: {
    backgroundColor: '#F5FCFF',
    height: windowSize.height
   },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteFont: {
    color: '#FFF'
  },
  touchable: {
    borderRadius: 5
  },
  createTour: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
    marginTop: -50,
  },
});
 
module.exports = MyTours;
