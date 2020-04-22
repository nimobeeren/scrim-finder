import React from "react";
import PropTypes from "prop-types";
import "../../styles/Map.css";

const Map = props => <div className="map">{props.name}</div>;

Map.propTypes = {
  name: PropTypes.string.isRequired
};

export default Map;
