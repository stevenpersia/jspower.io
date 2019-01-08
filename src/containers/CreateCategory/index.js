import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './styles.css';

class CreateCategory extends Component {
	state = {
		title: '',
		description: '',
		color: '',
		errors: { title: false, description: false, color: false }
	};

	redirectToLoginPage = () => {
		this.props.history.push('/login');
	};

	handleInputChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	onSubmit = e => {
		if (this.state.title && this.state.description && this.state.color) {
			axios
				.post(
					'http://localhost:3001/api/categories/',
					{
						title: this.state.title,
						description: this.state.description,
						color: this.state.color
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
			const colorValidation = this.state.color.length === 0 ? true : false;

			this.setState({
				errors: {
					title: titleValidation,
					description: descriptionValidation,
					color: colorValidation
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
							name="title"
							label="Titre de la catégorie"
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
							label="Description de la catégorie"
							error={this.state.errors.description === true ? true : false}
							onChange={this.handleInputChange}
							margin="normal"
							style={{ width: 400 }}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							name="color"
							label="Code couleur"
							placeholder="F2F2F2"
							error={this.state.errors.color === true ? true : false}
							onChange={this.handleInputChange}
							margin="normal"
							style={{ width: 400 }}
						/>
					</Grid>
					<Grid item xs={12} style={{ textAlign: 'center', marginTop: 40 }}>
						<a className="button-send" href="/" onClick={this.onSubmit}>
							Create category
						</a>
					</Grid>
				</form>
			</Grid>
		);
	}
	componentDidMount() {
		if (!this.props.user.token) {
			this.redirectToLoginPage();
		}
	}
}

export default CreateCategory;
