import React from "react";
import PropTypes from "prop-types";
import "../../styles/ChevronToggle.css";

const ChevronToggle = ({ className, pointUp, onClick }) => (
  <div className={"chevron__wrapper " + className} onClick={onClick}>
    <div className={"chevron" + (pointUp ? " chevron--expanded" : "")} />
  </div>
);

ChevronToggle.propTypes = {
  className: PropTypes.string,
  pointUp: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ChevronToggle;
