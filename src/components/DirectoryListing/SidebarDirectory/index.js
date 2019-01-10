import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { NavLink, withRouter } from 'react-router-dom';
import DabAudio from '../../../assets/eastereggs/puissance.mp3';
import DabImage from '../../../assets/eastereggs/dab2.gif';
import axios from 'axios';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import './styles.css';

class SidebarDirectory extends Component {
	state = {
		categories: [],
		dab: [],
		left: false
	};

	puissance = () => {
		let key = [68, 65, 66];
		let ck = 0;
		let max = key.length;
		let data = DabImage;
		document.addEventListener('keydown', function(e) {
			if (e.which === key[ck]) {
				ck++;
			} else {
				ck = 0;
			}
			if (ck >= max) {
				document.getElementById('audio').play();
				ck = 0;

				var img = new Image();
				img.src = data;
				img.style.width = '25%';
				img.style.height = '141px';
				img.style.transition = '1s all';
				img.style.position = 'fixed';
				img.style.left = '0';
				img.style.top = '0';
				img.style.zIndex = 999999;

				document.body.appendChild(img);

				window.setTimeout(function() {
					img.parentNode.removeChild(img);
				}, 2300);
			}
		});
	};

	onLogOut = e => {
		this.props.logOut();
		this.props.history.push('/');
	};

	// Render all categories
	renderCategories = () => {
		const allCategories = [];
		for (let i = 0; i < this.state.categories.length; i++) {
			let color = '#' + this.state.categories[i].color;
			allCategories.push(
				<NavLink
					to={{ pathname: '/categories/' + this.state.categories[i]._id }}
					className="sidebar-link"
					key={[i]}
					activeClassName="active"
				>
					<div>
						<i
							className="icon-logo"
							style={{ verticalAlign: 'middle', color: color }}
						/>
						<span className="sidebar-link__text">
							{this.state.categories[i].title}
						</span>
					</div>
					<span className="sidebar-link__number">
						{this.state.categories[i].links.length}
					</span>
				</NavLink>
			);
		}
		return allCategories;
	};

	renderTotalOfLinks = () => {
		let totalOfLinks = 0;
		for (let i = 0; i < this.state.categories.length; i++) {
			totalOfLinks += this.state.categories[i].links.length;
		}
		return totalOfLinks;
	};

	renderAccountNav = () => {
		if (this.props.user && this.props.user.token) {
			return (
				<Fragment>
					<NavLink
						to={{ pathname: '/add-link' }}
						className="sidebar-link"
						activeClassName=""
					>
						<div>
							<i className="icon-logo" style={{ verticalAlign: 'middle' }} />
							<span className="sidebar-link__text">Add a link</span>
						</div>
					</NavLink>
					<NavLink
						to={{ pathname: '/create-category' }}
						className="sidebar-link"
						activeClassName=""
					>
						<div>
							<i className="icon-logo" style={{ verticalAlign: 'middle' }} />
							<span className="sidebar-link__text">Create a category</span>
						</div>
					</NavLink>
					<NavLink
						to={{ pathname: '/' }}
						onClick={() => this.onLogOut()}
						className="sidebar-link"
						activeClassName=""
					>
						<div>
							<i className="icon-logo" style={{ verticalAlign: 'middle' }} />
							<span className="sidebar-link__text">Log out</span>
						</div>
					</NavLink>
				</Fragment>
			);
		} else {
			return;
		}
	};

	toggleDrawer = (side, open) => () => {
		this.setState({ ...this.state, [side]: open });
	};

	render() {
		return (
			<Grid item xs={12} md={3} className="sidebar">
				{this.puissance()}
				<audio id="audio">
					<source src={DabAudio} type="audio/mp3" />
				</audio>

				<div className="logo">
					<a href="/">
						<i className="icon-logo hot" />
						<h2 className="top-bar__title">JSPOWER.IO</h2>
						<span className="version">βeta</span>
					</a>
				</div>

				<span
					onClick={this.toggleDrawer('left', true)}
					style={{ cursor: 'pointer' }}
				>
					<div className="burger">
						<MenuIcon />
					</div>
				</span>
				<Drawer
					open={this.state.left}
					onClose={this.toggleDrawer('left', false)}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('left', false)}
						onKeyDown={this.toggleDrawer('left', false)}
						style={{ width: 280 }}
					>
						<div className="sidebar-section-head">
							<span className="sidebar-section__title">All categories</span>
							<span className="sidebar-all-links">
								{this.renderTotalOfLinks()}
							</span>
						</div>
						{this.renderCategories()}
						{this.renderAccountNav()}
					</div>
				</Drawer>
				<section className="sidebar-section categories">
					<div className="sidebar-section-head">
						<span className="sidebar-section__title">All categories</span>
						<span className="sidebar-all-links">
							{this.renderTotalOfLinks()}
						</span>
					</div>
					{this.renderCategories()}
				</section>
				<section className="sidebar-section account">
					{this.renderAccountNav()}
					<a
						rel="noopener noreferrer"
						href="https://github.com/stevenpersia/"
						target="_blank"
						className="sidebar-link"
					>
						<div>
							<i className="icon-logo" style={{ verticalAlign: 'middle' }} />
							<span className="sidebar-link__text">Made by Steven Persia</span>
						</div>
					</a>
				</section>
			</Grid>
		);
	}

	componentDidMount() {
		axios
			.get('https://jspower-api.herokuapp.com/api/categories/')
			.then(response => {
				this.setState({
					categories: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
}

export default withRouter(SidebarDirectory);
