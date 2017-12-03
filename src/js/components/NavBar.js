import React from 'react';

import './../../styles/components/NavBar.css';

import Button from './Button';

const NavBar = () => (
	<nav>
		<div className="nav-left">
			<h1 className="nav__item">CSGO Scrim Finder</h1>
		</div>
		<div className="nav-right">
			<div className="nav__item">
				<Button label="Log in"/>
			</div>
			<div className="nav__item">
				<Button className="btn--secondary" label="About"/>
			</div>
		</div>
	</nav>
);

export default NavBar;