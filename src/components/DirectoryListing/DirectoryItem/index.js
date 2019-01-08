import React, { Component } from 'react';
import './styles.css';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';

class DirectoryItem extends Component {
	render() {
		return (
			<Grid item xs={12} sm={6} md={6}>
				<Card className="item">
					<CardContent>
						<h4>{this.props.title}</h4>
						<p>{this.props.description}</p>
						<a
							href={this.props.url}
							target="_blank"
							rel="noopener noreferrer"
							alt={this.props.title}
							className="button"
						>
							Go to website
						</a>
					</CardContent>
				</Card>
			</Grid>
		);
	}
}

export default DirectoryItem;
