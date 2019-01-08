import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './styles.css';

class LogIn extends Component {
	state = {
		email: '',
		password: '',
		errors: { email: false, password: false }
	};

	handleInputChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	redirectToLoginPage = () => {
		this.props.history.push('/');
	};

	onSubmit = e => {
		if (this.state.email && this.state.password) {
			axios
				.post('http://localhost:3001/api/users/log_in', {
					account: {
						email: this.state.email,
						password: this.state.password
					}
				})
				.then(response => {
					if (response.data && response.data.token) {
						this.props.logIn({
							token: response.data.token,
							_id: response.data._id
						});
						this.props.history.push('/');
					}
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			const emailValidation = this.state.email.length === 0 ? true : false;
			const passwordValidation =
				this.state.password.length === 0 ? true : false;

			this.setState({
				errors: {
					email: emailValidation,
					password: passwordValidation
				}
			});
		}
		e.preventDefault();
	};

	render() {
		return (
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="flex-start"
				xs={12}
				md={9}
				style={{ paddingTop: 50 }}
			>
				<form>
					<Grid item>
						<TextField
							required
							name="email"
							label="Email address"
							error={this.state.errors.email === true ? true : false}
							onChange={this.handleInputChange}
							margin="normal"
							style={{ width: 400 }}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							type="password"
							name="password"
							label="Password"
							error={this.state.errors.password === true ? true : false}
							onChange={this.handleInputChange}
							margin="normal"
							style={{ width: 400 }}
						/>
					</Grid>
					<Grid item xs={12} style={{ textAlign: 'center', marginTop: 40 }}>
						<a className="button-send" href="/" onClick={this.onSubmit}>
							Log in
						</a>
					</Grid>
				</form>
			</Grid>
		);
	}
	componentDidMount() {
		if (this.props.user.token) {
			this.redirectToLoginPage();
		}
	}
}

export default LogIn;
