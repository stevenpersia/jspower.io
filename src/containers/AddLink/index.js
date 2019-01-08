import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import './styles.css';

class AddLink extends Component {
	state = {
		listCategories: [],
		title: '',
		description: '',
		url: '',
		category: '',
		errors: {
			title: false,
			description: false,
			color: false,
			category: false
		}
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
		this.props.history.push('/login');
	};

	onSubmit = e => {
		if (
			this.state.title &&
			this.state.description &&
			this.state.url &&
			this.state.category
		) {
			axios
				.post(
					'https://jspower-api.herokuapp.com/api/links/',
					{
						title: this.state.title,
						description: this.state.description,
						url: this.state.url,
						vote: 0,
						category: this.state.category
					},
					{ headers: { authorization: 'Bearer ' + this.props.user.token } }
				)
				.then(response => {
					this.props.history.push('/');
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			const titleValidation = this.state.title.length === 0 ? true : false;
			const descriptionValidation =
				this.state.description.length === 0 ? true : false;
			const urlValidation = this.state.url.length === 0 ? true : false;
			const categoryValidation =
				this.state.category.length === 0 ? true : false;

			this.setState({
				errors: {
					title: titleValidation,
					description: descriptionValidation,
					url: urlValidation,
					category: categoryValidation
				}
			});
		}
		e.preventDefault();
	};

	renderOptions = () => {
		const options = [];
		for (let i = 0; i < this.state.listCategories.length; i++) {
			options.push(
				<MenuItem
					value={this.state.listCategories[i]._id}
					key={this.state.listCategories[i]._id}
				>
					{this.state.listCategories[i].title}
				</MenuItem>
			);
		}
		return options;
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
							name="title"
							label="Title of link"
							error={this.state.errors.title === true ? true : false}
							onChange={this.handleInputChange}
							margin="normal"
							style={{ width: 400 }}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							name="description"
							label="Description of link"
							error={this.state.errors.description === true ? true : false}
							onChange={this.handleInputChange}
							margin="normal"
							style={{ width: 400 }}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							name="url"
							label="URL"
							placeholder="https://"
							error={this.state.errors.url === true ? true : false}
							onChange={this.handleInputChange}
							margin="normal"
							style={{ width: 400 }}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							name="category"
							value={this.state.category}
							select
							label="Category"
							error={this.state.errors.category === true ? true : false}
							onChange={this.handleInputChange}
							margin="normal"
							style={{ width: 400 }}
						>
							{this.renderOptions()}
						</TextField>
					</Grid>
					<Grid item xs={12} style={{ textAlign: 'center', marginTop: 40 }}>
						<a className="button-send" href="/" onClick={this.onSubmit}>
							Submit link
						</a>
					</Grid>
				</form>
			</Grid>
		);
	}
	componentDidMount() {
		if (!this.props.user.token) {
			this.redirectToLoginPage();
		} else {
			axios
				.get('https://jspower-api.herokuapp.com/api/categories/')
				.then(response => {
					this.setState({
						listCategories: response.data
					});
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
}

export default AddLink;
