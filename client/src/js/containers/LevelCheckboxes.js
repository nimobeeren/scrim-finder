import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CheckboxGroup from "../components/CheckboxGroup";

const LevelCheckboxes = ({ levelNames, onChange }) => {
  const items = levelNames.map((level, i) => {
    return {
      value: i,
      label: level,
    };
  });
  return <CheckboxGroup items={items} onChange={onChange} />;
};

LevelCheckboxes.propTypes = {
  onChange: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    levelNames: state.levelNames,
  };
}

export default connect(mapStateToProps)(LevelCheckboxes);
