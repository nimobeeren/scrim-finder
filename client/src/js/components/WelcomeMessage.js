import React from "react";
import PropTypes from "prop-types";
import "../../styles/WelcomeMessage.css";

const WelcomeMessage = ({ user }) => {
  if (!user || !user.name) {
    return <div className="welcome-message welcome-message__hidden" />;
  }
  return (
    <div className="welcome-message">
      Welcome, <span>{user.name}</span>!
    </div>
  );
};

WelcomeMessage.propTypes = {
  user: PropTypes.object
};

export default WelcomeMessage;
