'use strict'

var React = require('react-native');
// var Login = require('./Login');
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
	}

	logout () {
		var component = this;
		AsyncStorage.removeItem('token')
		.then(() => {
			console.log('removed token!')
			utils.getToken()
			// utils.navigateTo.call(component, 'Login', require('./Login'), {})
			// component.props.navigator.replace.call(component, {title: 'Login', component: Login})
			// console.log('nav length', component.props.navigator)
			// component.navigator.jumpTo({
			// 	title: 'Login', 
			// 	component: Login
			// })
		alert('you are successfully logged out!');
		})
		.catch((error) => {
			console.log('Error in removing token: ', error)
		})
	}

	navigateToLogin () {
		console.log(this.refs.loginview);
		var Login = require('./Login');
		utils.navigateTo.call(this, 'Login', Login, {})
	}

	render () {
		return(
			<View style={ styles.mainContainer }>
				<View>
					<TouchableHighlight
						style={ [styles.mainButton, {width: 150}] }
						onPress={ this.logout.bind(this) }
						underlayColor="#FCC107">
						<Text style={ styles.mainButtonText }>Logout</Text>
					</TouchableHighlight>
				</View>
					<TouchableHighlight
						ref='loginview'
						onPress={ this.navigateToLogin.bind(this) }
						underlayColor="#727272">
						<Text>Click here to Login</Text>
					</TouchableHighlight>
				<View>

				</View>
			</View>
		)
	}

}

module.exports = Settings;
