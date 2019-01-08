import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import DirectoryItem from '../../components/DirectoryListing/DirectoryItem';
import axios from 'axios';

class Home extends Component {
	state = {
		allLinks: []
	};

	renderLinks = () => {
		const links = [];
		if (this.state.allLinks) {
			for (let i = 0; i < this.state.allLinks.length; i++) {
				links.push(
					<DirectoryItem
						key={i}
						id={this.state.allLinks[i]._id}
						title={this.state.allLinks[i].title}
						description={this.state.allLinks[i].description}
						url={this.state.allLinks[i].url}
						vote={this.state.allLinks[i].vote}
					/>
				);
			}
			return links.reverse();
		}
	};

	render() {
		return (
			<Fragment>
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
			</Fragment>
		);
	}
	componentDidMount() {
		axios
			.get('http://localhost:3001/api/links/')
			.then(response => {
				this.setState({
					allLinks: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
}

export default Home;
