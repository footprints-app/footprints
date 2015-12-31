'use strict'

var React = require('react-native');
var Login = require('./Login');
var Main = require('./Main');
var styles = require('../lib/stylesheet');
var utils = require('../lib/utility');

var {
	Image,
	Text,
	AsyncStorage,
	View,
	Component,
	TouchableHighlight
	} = React

class Settings extends Component {
	constructor (props) {
		super(props)
		//this.state = {
		//	loggedIn: true
		//}
	}

	logout () {
		var component = this;
		AsyncStorage.removeItem('token')
			.then(() => {
				console.log('removed token!')
				utils.getToken()
				//utils.navigateTo.call(component, 'Login', require('./Main'), {})
				//this.setState({
				//	loggedIn: false
				//})
				component.props.navigator.replace.call(component, {title: 'Login', component: Login})
			})
			.catch((error) => {
				console.log('Error in removing token: ', error)
			})
	}

	render () {
		return(
			<View style={styles.mainContainer}>
				<TouchableHighlight
					style={[styles.mainButton, {width: 150}]}
					onPress={this.logout.bind(this)}
					underlayColor="#FCC107">
					<Text style={styles.mainButtonText}>Logout</Text>
				</TouchableHighlight>
			</View>
		)
	}

}

module.exports = Settings;
