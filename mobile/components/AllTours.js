'use strict';
 
var React = require('react-native');
var TourDetail = require('./TourDetail');
var utils = require('../lib/utility');
var styles = require('../lib/stylesheet')

var {
  Image,
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
    // var tours = FAKE_TOUR_DATA;
    // this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(tours)
    // });

    /* Use this code to make actual API request to fetch data from database */
    this.fetchData();
  }

  /**
   * Makes GET request to server and sets all tours in DB to the state.
   *
   */
  fetchData() {
    // alert('in all tours fetch data')
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
      <TouchableHighlight 
        onPress={ utils.navigateTo.bind(this, tour.tourName, TourDetail, {tour}) }  
        underlayColor='#dddddd'>
        <View>
          <View>
            <Image
              source={{uri: tour.image}}
              style={[styles.tourPhoto,
              {resizeMode: Image.resizeMode.cover}]} >
            <Text style={styles.title}> {tour.tourName} </Text>
            <Text style={styles.city}> {tour.cityName} </Text></Image>
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

 
module.exports = AllTours;
