import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../../styles/Checkbox.css';

export class Checkbox extends Component {
	constructor(props) {
		super(props);

		// Set default state
		this.state = {
			isChecked: this.props.isChecked
		};

		// Bind event handler
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		// Toggle checked state
		const newState = {
			isChecked: !this.state.isChecked
		};
		this.setState(newState);

		// Call original event handler
		const { onChange } = this.props;
		if (typeof onChange === 'function') {
			onChange(e, newState);
		}
	}

	render() {
		const { value, label } = this.props;
		const { isChecked } = this.state;
		return (
			<label className="checkbox">
				<input
					type="checkbox"
					value={value}
					checked={isChecked}
					onChange={this.handleChange}/>
				{label}
			</label>
		);
	}
}

Checkbox.propTypes = {
	label: PropTypes.string.isRequired,
	isChecked: PropTypes.bool,
	onChange: PropTypes.func
};
Checkbox.defaultProps = {
	label: "Checkbox",
	isChecked: false
};

export default Checkbox;
