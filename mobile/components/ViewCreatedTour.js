'use strict';

var React = require('react-native');
var MyTours = require('./MyTours');
// var AddPlace = require('./AddPlace');
var {
  StyleSheet,
  Image,
  View,
  Text,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

class ViewCreatedTour extends Component {

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
    var places = this.props.createdTour.places;
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(places) });
    //this.fetchData();
  }

  addPlace () {
    console.log('in view createdTour.....', this.props.createdTour)
    var newTour = this.props.createdTour;
    var AddPlace = require('./AddPlace');
    this.props.navigator.push({
      title: "Add Place",
      component: AddPlace,
      passProps: {newTour}
    });
  }

  onPressDone () {
    this.props.navigator.push({
      title: "My Tours",
      component: MyTours,
      passProps: {}
    });
  }

  renderPlace(place) {
    return (
      <TouchableHighlight onPress={ () => alert('go to place detail')}  underlayColor='#dddddd'>
        <View>
          <View style={styles.placeContainer}>
            <View style={styles.rightContainer}>
              <Text style={styles.placeName}>{place.placeName}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    var newTour = this.props.createdTour;
    console.log('props...', this.props)
    // console.log('new tour....', newTour)
    // console.log('props...', this.props)
    var tourName = (typeof newTour.tourName !== 'undefined') ? newTour.tourName : '';
    var description = (typeof newTour.description !== 'undefined') ? newTour.description : '';
    var category = (typeof newTour.category !== 'undefined') ? newTour.category : '';
    var duration = (typeof newTour.duration !== 'undefined') ? newTour.duration : '';
    var userName = (typeof newTour.userName !== 'undefined') ? newTour.userName : '';
    var cityName = (typeof newTour.cityName !== 'undefined') ? newTour.cityName : '';
    var state = (typeof newTour.state !== 'undefined') ? newTour.state : '';
    var country = (typeof newTour.country !== 'undefined') ? newTour.country : '';
    
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Tour Name: {tourName}</Text>
        <Text style={styles.description}>Category : {category }</Text>
        <Text style={styles.description}>Duration: {duration}</Text>
        <Text style={styles.description}>City Name: {cityName}   State: {state}   Country: {country}</Text>  
        <Text style={styles.description}>Places: </Text>

        <View style={styles.panel}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderPlace.bind(this)}
            style={styles.listView}/>
        </View>

        <TouchableHighlight onPress={ () => this.addPlace() } style={styles.touchable} underlayColor="white">
          <View style={styles.addPlaceBtn}>
            <Text style={styles.whiteFont}>Add Place</Text>
          </View>  
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => this.onPressDone () } style={styles.touchable} underlayColor="white">
          <View style={styles.doneBtn}>
            <Text style={styles.whiteFont}>Done</Text>
          </View>  
        </TouchableHighlight>
      
      </View>
    );
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
  }

});

module.exports = ViewCreatedTour;
