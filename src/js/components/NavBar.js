import React from 'react';

import Button from './Button';
import './../../styles/components/NavBar.css';


const NavBar = () => (
	<nav>
		<div className="nav__left">
			<h1 className="nav__item">CSGO Scrim Finder</h1>
		</div>
		<div className="nav__right">
			<Button className="btn btn--nav" label="Log in" onClick={() => alert("Not yet implemented")}/>
			<Button className="btn btn--secondary btn--about" label="" onClick={() => alert("Not yet implemented")}/>
		</div>
	</nav>
);

export default NavBar;
