'use strict';
 
var React = require('react-native');
var TourDetail = require('./TourDetail');

var FAKE_TOUR_DATA = [
    {tourInfo: {title: 'Walk in Mission', city: "San Francisco", description: "cool place",
    imageLinks: {thumbnail: 'http://thenextweb.com/wp-content/blogs.dir/1/files/2011/11/san-francisco.jpg'}}},
    {tourInfo: {title: 'some place', city: "Mountain View", description: "cool place",
    imageLinks: {thumbnail: 'http://gotravelaz.com/wp-content/uploads/images/Mountain_View_20177.jpg'}}},
    {tourInfo: {title: 'Another place', city: "Santa Cruz", description: "cool place",
    imageLinks: {thumbnail: 'http://api2.ning.com/files/nBD8FQWarq-hjMAPw1Qee0imzGMlA*6DGSe0uXvibAd7CiCPg-leen18UZ7GVdpzJosmOHBmBHlojFDZyIYv0P1LNDOBzDtp/Summer~_Boardwalk_California.jpg'}}}
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

  componentDidMount() {
    var tours = FAKE_TOUR_DATA;
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tours)
    });
    //this.fetchData();
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

  showTourDetail(tour) {
    this.props.navigator.push({
      title: tour.tourInfo.title,
      component: TourDetail,
      passProps: {tour}
    });
  }

  renderTour(tour) {
    return (
      <TouchableHighlight onPress={ () => this.showTourDetail(tour)}  underlayColor='#dddddd'>
        <View>
          <View style={styles.container}>
            <Image
              source={{uri: tour.tourInfo.imageLinks.thumbnail}}
              style={styles.thumbnail} />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{tour.tourInfo.title}</Text>
              <Text style={styles.city}>{tour.tourInfo.city}</Text>
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
