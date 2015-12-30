'use strict'

var React = require('react-native');
var Login = require('./Login');
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
	}

	logout () {
		AsyncStorage.removeItem('token')
			.then(() => {
				console.log('removed token!')
				utils.navigateTo.call(this, 'Login', Login, {})
			})
			.catch((error) => {
				console.log('Error in removing token: ', error)
			})
	}

	render () {
		return(
			<View style={styles.mainContainer}>
				<TouchableHighlight
					style={[styles.button, {width: 150}]}
					onPress={this.logout.bind(this)}>
					<Text style={styles.buttonText}>Logout</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

module.exports = Settings;