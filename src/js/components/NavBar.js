import React from 'react';

import Button from './Button';
import './../../styles/components/NavBar.css';


const NavBar = () => (
	<nav>
		<div className="nav__content">
			<h1 className="nav__group">CSGO Scrim Finder</h1>
			<div className="nav__group">
				<Button className="btn btn--nav btn--about btn--secondary"
						label=""
						href="https://github.com/nimobeeren/scrim-finder/"/>
				<Button className="btn btn--nav btn--shrink"
						label="Log in"
						onClick={() => alert("Not yet implemented")}/>
			</div>
		</div>
	</nav>
);

export default NavBar;
