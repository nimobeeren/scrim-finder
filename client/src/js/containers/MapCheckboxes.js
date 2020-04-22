import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CheckboxGroup from "../components/CheckboxGroup";

const MapCheckboxes = ({ mapNames, onChange }) => {
  const items = mapNames.map(mapName => {
    return {
      value: mapName.toLowerCase(),
      label: mapName,
      isChecked: false
    };
  });
  return <CheckboxGroup items={items} onChange={onChange} />;
};

MapCheckboxes.propTypes = {
  onChange: PropTypes.func
};

function mapStateToProps(state) {
  return {
    mapNames: state.mapNames
  };
}

export default connect(mapStateToProps)(MapCheckboxes);
