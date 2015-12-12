'use strict';
 
var React = require('react-native');
var TourDetail = require('./TourDetail');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var utils = require('../lib/utility');
var CreateTour = require('./CreateTour');

var FAKE_MY_TOUR_DATA = [

  {tourName: 'Mission', cityName: "San Jose", description: "cool place", 
  category: "sports", duration: "", userName:"Jira", state: "CA", country: "USA", 
  places: [
  { placeName: "Fisherman Wharf", address: "1st street, San Francisco", description: "Lovely place", order: 1, image: 'http://thenextweb.com/wp-content/blogs.dir/1/files/2011/11/san-francisco.jpg'}, 
  { placeName: "Golden Gate", address: "5th street, San Francisco", description: "Beautiful Bridge", order: 2, image: 'http://thenextweb.com/wp-content/blogs.dir/1/files/2011/11/san-francisco.jpg' },
  { placeName: "Fisherman Wharf", address: "1st street, San Francisco", description: "Lovely place", order: 1, image: 'http://thenextweb.com/wp-content/blogs.dir/1/files/2011/11/san-francisco.jpg'}, 
  { placeName: "Golden Gate", address: "5th street, San Francisco", description: "Beautiful Bridge", order: 2, image: 'http://thenextweb.com/wp-content/blogs.dir/1/files/2011/11/san-francisco.jpg' },
  { placeName: "Fisherman Wharf", address: "1st street, San Francisco", description: "Lovely place", order: 1, image: 'http://thenextweb.com/wp-content/blogs.dir/1/files/2011/11/san-francisco.jpg'}, 
  { placeName: "Golden Gate", address: "5th street, San Francisco", description: "Beautiful Bridge", order: 2, image: 'http://thenextweb.com/wp-content/blogs.dir/1/files/2011/11/san-francisco.jpg' },
  ],
  image: 'http://thenextweb.com/wp-content/blogs.dir/1/files/2011/11/san-francisco.jpg'},

  {tourName: 'Walk in Mountain View Downtown', cityName: "Mountain View", description: "super cool place", 
  category: "chill", duration: "", userName:"Rochelle", state: "CA", country: "USA", 
  places: [{
    placeName: "Downtown", address: "2nd street, Mountain View", description: "awesome place", order: 2,
    image: 'http://gotravelaz.com/wp-content/uploads/images/Mountain_View_20177.jpg'
  }],
  image: 'http://gotravelaz.com/wp-content/uploads/images/Mountain_View_20177.jpg'},

  {tourName: 'Walk in Mountain View Downtown', cityName: "Mountain View", description: "super cool place", 
  category: "chill", duration: "", userName:"Rochelle", state: "CA", country: "USA", 
  places: [{
    placeName: "Downtown", address: "2nd street, Mountain View", description: "awesome place", order: 2,
    image: 'http://gotravelaz.com/wp-content/uploads/images/Mountain_View_20177.jpg'
  }],
  image: 'http://gotravelaz.com/wp-content/uploads/images/Mountain_View_20177.jpg'},

  {tourName: 'Walk in Mountain View Downtown', cityName: "Mountain View", description: "super cool place", 
  category: "chill", duration: "", userName:"Rochelle", state: "CA", country: "USA", 
  places: [{
    placeName: "Downtown", address: "2nd street, Mountain View", description: "awesome place", order: 2,
    image: 'http://gotravelaz.com/wp-content/uploads/images/Mountain_View_20177.jpg'
  }],
  image: 'http://gotravelaz.com/wp-content/uploads/images/Mountain_View_20177.jpg'},

  {tourName: 'Walk in Mountain View Downtown', cityName: "Mountain View", description: "super cool place", 
  category: "chill", duration: "", userName:"Rochelle", state: "CA", country: "USA", 
  places: [{
    placeName: "Downtown", address: "2nd street, Mountain View", description: "awesome place", order: 2,
    image: 'http://gotravelaz.com/wp-content/uploads/images/Mountain_View_20177.jpg'
  }],
  image: 'http://gotravelaz.com/wp-content/uploads/images/Mountain_View_20177.jpg'},

  {tourName: 'Walk in Mountain View Downtown', cityName: "Mountain View", description: "super cool place", 
  category: "chill", duration: "", userName:"Rochelle", state: "CA", country: "USA", 
  places: [{
    placeName: "Downtown", address: "2nd street, Mountain View", description: "awesome place", order: 2,
    image: 'http://gotravelaz.com/wp-content/uploads/images/Mountain_View_20177.jpg'
  }],
  image: 'http://gotravelaz.com/wp-content/uploads/images/Mountain_View_20177.jpg'},

  {tourName: 'Walk in Santa Cruz', cityName: "Santa Cruz", description: "Super duper cool place", 
  category: "Relax", duration: "", userName:"Si", state: "CA", country: "USA", 
  places: [{
    placeName: "Boardwalk", address: "3rd street, Santa Cruz", description: "Relaxing place", order: 3,
    image: 'http://api2.ning.com/files/nBD8FQWarq-hjMAPw1Qee0imzGMlA*6DGSe0uXvibAd7CiCPg-leen18UZ7GVdpzJosmOHBmBHlojFDZyIYv0P1LNDOBzDtp/Summer~_Boardwalk_California.jpg'
  }],
  image: 'http://api2.ning.com/files/nBD8FQWarq-hjMAPw1Qee0imzGMlA*6DGSe0uXvibAd7CiCPg-leen18UZ7GVdpzJosmOHBmBHlojFDZyIYv0P1LNDOBzDtp/Summer~_Boardwalk_California.jpg'},
];

var {
  Image,
  StyleSheet,
  Text,
  View,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
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
      })
    };
  }

  // fetchData() {
  //   fetch(REQUEST_URL)
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(responseData.items),
  //       isLoading: false
  //     });
  //   })
  //   .done();
  // }

  /**
   * ComponentDidMount function is called as soon as the render method is executed.
   * It fetches data from the database and sets the state with the fetched data.
   */

  componentDidMount () {
    var tours = FAKE_MY_TOUR_DATA;
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tours)
    });
    //this.fetchData();
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
        onPress={ utils.navigateTo.bind(this, tour.tourName, TourDetail, {tour}) } 
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
        onPress={ utils.navigateTo.bind(this, "Create Tour", CreateTour, {}) } 
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
  // listContainer: {
  //   flex: 1,
  //   backgroundColor: '#fff2f2',
  // },
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
