import React, { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "./Checkbox";

class CheckboxGroup extends Component {
  constructor(props) {
    super(props);

    // Set default state
    this.state = {
      checkedItems: this.props.defaultChecked || []
    };

    // Bind event handler
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, state) {
    const { value } = e.target;
    const newChecked = this.state.checkedItems;

    // Determine new state
    if (state.isChecked && !newChecked.includes(value)) {
      // Add checked item
      newChecked.push(value);
    } else if (!state.isChecked && newChecked.includes(value)) {
      // Remove checked item
      newChecked.splice(newChecked.indexOf(value), 1);
    }

    // Set new state
    const newState = {
      checkedItems: newChecked
    };
    this.setState(newState);

    // Call original event handler
    const { onChange } = this.props;
    if (typeof onChange === "function") {
      onChange(e, newState);
    }
  }

  render() {
    const { items } = this.props;
    return items.map(item => (
      <Checkbox
        key={item.value}
        value={item.value}
        label={item.label}
        checked={item.isChecked}
        onChange={this.handleChange}
      />
    ));
  }
}

CheckboxGroup.propTypes = {
  items: PropTypes.array.isRequired,
  defaultChecked: PropTypes.array,
  onChange: PropTypes.func
};

export default CheckboxGroup;
