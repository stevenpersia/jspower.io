import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DirectoryItem from '../../components/DirectoryListing/DirectoryItem';
import axios from 'axios';
import './styles.css';

class DirectoryListing extends Component {
	state = {
		categoryLinks: ['']
	};

	renderLinks = () => {
		const links = [];
		if (this.state.categoryLinks) {
			for (let i = 0; i < this.state.categoryLinks.length; i++) {
				links.push(
					<DirectoryItem
						key={i}
						id={this.state.categoryLinks[i]._id}
						title={this.state.categoryLinks[i].title}
						description={this.state.categoryLinks[i].description}
						url={this.state.categoryLinks[i].url}
						vote={this.state.categoryLinks[i].vote}
						noIcon
					/>
				);
			}
			return links.reverse();
		}
	};

	render() {
		return (
			<Grid
				container
				direction="row"
				justify="flex-start"
				alignItems="flex-start"
				xs={12}
				md={9}
			>
				{this.renderLinks()}
			</Grid>
		);
	}

	componentDidMount() {
		axios
			.get(
				'https://jspower-api.herokuapp.com/api/categories/' +
					this.props.match.params.id
			)
			.then(response => {
				this.setState({
					categoryLinks: response.data.links
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			axios
				.get(
					'https://jspower-api.herokuapp.com/api/categories/' +
						this.props.match.params.id
				)
				.then(response => {
					console.log(response.data);
					this.setState({
						categoryLinks: response.data.links
					});
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
}

export default DirectoryListing;
