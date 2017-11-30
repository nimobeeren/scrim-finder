import React, {Component} from 'react';

import Button from './Button';

import './../../styles/components/NavBar.css';

class NavBar extends Component {
	render() {
		return (
			<nav>
				<div className="nav-left">
					<h1 className="nav__item">CSGO Scrim Finder</h1>
				</div>
				<div className="nav-right">
					<div className="nav__item">
						<Button label="Log in"/>
					</div>
					<div className="nav__item">
						<Button label="About"/>
					</div>
				</div>
			</nav>
		)
	}
}

export default NavBar;