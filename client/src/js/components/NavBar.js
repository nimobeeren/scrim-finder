import React from "react";
import WelcomeMessageContainer from "../containers/WelcomeMessageContainer";
import Button from "./Button";
import LoginButton from "../containers/LoginButton";
import "./../../styles/NavBar.css";

const NavBar = () => (
  <nav>
    <div className="nav__content">
      <div className="nav__group group--title">
        <h1>CSGO Scrim Finder</h1>
        <WelcomeMessageContainer />
      </div>
      <div className="nav__group group--buttons">
        <Button
          className="btn btn--nav btn--about btn--secondary"
          label=""
          href="https://github.com/nimobeeren/scrim-finder/"
        />
        <LoginButton />
      </div>
    </div>
  </nav>
);

export default NavBar;
