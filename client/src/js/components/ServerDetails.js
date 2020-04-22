import React from "react";
import PropTypes from "prop-types";
import "../../styles/ServerDetails.css";

const ServerDetails = ({ ip, password }) => {
  const connectCommand = `connect ${ip}${
    password ? `;password ${password}` : ""
  }`;
  return (
    <div className="server-details">
      Join at: <pre>{connectCommand}</pre>
    </div>
  );
};

ServerDetails.propTypes = {
  ip: PropTypes.string.isRequired,
  password: PropTypes.string,
};

export default ServerDetails;
