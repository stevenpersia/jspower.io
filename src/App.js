import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DirectoryListing from './containers/DirectoryListing';
import AddLink from './containers/AddLink';
import CreateCategory from './containers/CreateCategory';
import LogIn from './containers/LogIn';
import Home from './containers/Home';
import Cookies from 'js-cookie';
import SidebarDirectory from './components/DirectoryListing/SidebarDirectory';
import './App.css';

class App extends Component {
	state = {
		user: {
			_id: Cookies.get('_id') || '',
			token: Cookies.get('token') || ''
		}
	};

	logIn = user => {
		Cookies.set('_id', user._id);
		Cookies.set('token', user.token);

		this.setState({
			user: {
				_id: user._id,
				token: user.token
			}
		});
	};

	logOut = () => {
		Cookies.remove('_id');
		Cookies.remove('token');

		this.setState({
			user: {
				_id: '',
				token: ''
			}
		});
	};

	render() {
		return (
			<Fragment>
				<Router>
					<Fragment>
						<Grid container alignItems="flex-start">
							<SidebarDirectory logOut={this.logOut} user={this.state.user} />
							<Route
								path="/"
								exact
								render={props => (
									<Home
										{...props}
										logIn={this.logIn}
										logOut={this.logOut}
										user={this.state.user}
									/>
								)}
							/>
							<Route
								path="/create-category"
								exact
								render={props => (
									<CreateCategory
										{...props}
										logIn={this.logIn}
										user={this.state.user}
									/>
								)}
							/>
							<Route
								path="/add-link"
								exact
								render={props => (
									<AddLink
										{...props}
										logIn={this.logIn}
										user={this.state.user}
									/>
								)}
							/>
							<Route
								path="/categories/:id"
								exact
								render={props => <DirectoryListing {...props} />}
							/>
							<Route
								path="/login"
								exact
								render={props => (
									<LogIn {...props} logIn={this.logIn} user={this.state.user} />
								)}
							/>
						</Grid>
					</Fragment>
				</Router>
			</Fragment>
		);
	}
}

export default App;
