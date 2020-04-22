import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RadioGroup from "../components/RadioGroup";

const LevelRadioButtons = ({ levelNames, onChange }) => {
  const items = levelNames.map((level, i) => {
    return {
      value: i,
      label: level
    };
  });
  return <RadioGroup items={items} defaultItem={"1"} onChange={onChange} />;
};

LevelRadioButtons.propTypes = {
  onChange: PropTypes.func
};

function mapStateToProps(state) {
  return {
    levelNames: state.levelNames
  };
}

export default connect(mapStateToProps)(LevelRadioButtons);
