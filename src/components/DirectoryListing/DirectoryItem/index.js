import React, { Component, Fragment } from 'react';
import './styles.css';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';

class DirectoryItem extends Component {
	render() {
		return (
			<Grid
				item
				xs={12}
				sm={6}
				md={6}
				style={{ display: 'flex', alignSelf: 'stretch' }}
			>
				<Card className="item">
					<CardContent>
						<h4>{this.props.title}</h4>
						{!this.props.noIcon ? (
							<Fragment>
								<i
									className="icon-logo"
									style={{
										verticalAlign: 'middle',
										color: '#' + this.props.iconColor,
										fontSize: 14
									}}
								/>
								<span className="category">{this.props.category}</span>
							</Fragment>
						) : null}

						<p>{this.props.description}</p>
					</CardContent>
					<a
						href={this.props.url}
						target="_blank"
						rel="noopener noreferrer"
						alt={this.props.title}
						className="button"
					>
						Go to website
					</a>
				</Card>
			</Grid>
		);
	}
}

export default DirectoryItem;
