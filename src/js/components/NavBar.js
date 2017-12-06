import React from 'react';

import Button from './Button';
import './../../styles/components/NavBar.css';


const NavBar = () => (
	<nav>
		<div className="nav__content">
			<h1 className="nav__group">CSGO Scrim Finder</h1>
			<div className="nav__group">
				<div className="nav__item">
					<Button className="btn btn--secondary btn--about" label="" onClick={() => alert("Not yet implemented")}/>
				</div>
				<div className="nav__item">
					<Button className="btn btn--nav" label="Log in" onClick={() => alert("Not yet implemented")}/>
				</div>
			</div>
		</div>
	</nav>
);

export default NavBar;
