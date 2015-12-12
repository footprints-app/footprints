'use strict';
 
var React = require('react-native');
var TourDetail = require('./TourDetail');
var utils = require('../lib/utility');

var FAKE_TOUR_DATA = [

  {tourName: 'Walk in Mission', cityName: "San Francisco", description: "cool place", 
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
 
class AllTours extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {

    /* Use this code for fake front end data */
    var tours = FAKE_TOUR_DATA;
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tours)
    });

    /* Use this code to make actual API request to fetch data from database */
    //this.fetchData();
  }

  fetchData() {
    utils.makeRequest('allTours', {})
    .then((response) => {
      console.log('response body from allTours: ', response);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response),
        isLoading: false
      });
    })
    .done();
  }

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS
          size='large'/>
        <Text>
          Loading tours...
        </Text>
      </View>
    );
  }

  renderTour(tour) {
    return (
      <TouchableHighlight onPress={ utils.navigateTo.bind(this, tour.tourName, TourDetail, {tour}) }  underlayColor='#dddddd'>
        <View>
          <View style={styles.container}>
            <Image
              source={{uri: tour.image}}
              style={styles.thumbnail} />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{tour.tourName}</Text>
              <Text style={styles.city}>{tour.cityName}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    // if (this.state.isLoading) {
    //   return this.renderLoadingView();
    // }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTour.bind(this)}
        style={styles.listView}/>
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
    backgroundColor: '#F5FCFF'
   },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
 
module.exports = AllTours;
