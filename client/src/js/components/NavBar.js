import React from 'react';
import Button from './Button';
import LoginButton from "../containers/LoginButton";
import './../../styles/NavBar.css';

const NavBar = () => (
	<nav>
		<div className="nav__content">
			<h1 className="nav__group">CSGO Scrim Finder</h1>
			<div className="nav__group">
				<Button className="btn btn--nav btn--about btn--secondary"
						label=""
						href="https://github.com/nimobeeren/scrim-finder/"/>
				<LoginButton/>
			</div>
		</div>
	</nav>
);

export default NavBar;
