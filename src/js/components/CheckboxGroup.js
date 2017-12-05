import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox';

class CheckboxGroup extends Component {
	constructor(props) {
		super(props);

		// Set default state
		this.state = {
			checkedItems: []
		};

		// Bind event handler
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e, state) {
		const {value} = e.target;
		const {checkedItems} = this.state;

		// Determine new state
		if (state.isChecked && !checkedItems.includes(value)) {
			// Add checked item
			checkedItems.push(value);
		} else if (!state.isChecked && checkedItems.includes(value)) {
			// Remove checked item
			checkedItems.splice(checkedItems.indexOf(value), 1);
		}

		// Set new state
		const newState = {
			checkedItems: checkedItems
		};
		this.setState(newState);

		// Call original event handler
		const {onChange} = this.props;
		if (typeof onChange === 'function') {
			onChange(e, newState);
		}
	}

	render() {
		const {items} = this.props;
		return Object.keys(items).map((item, i) => (
			<Checkbox key={i} label={item} checked={items[item]} onChange={this.handleChange}/>
		));
	}
}

CheckboxGroup.propTypes = {
	items: PropTypes.object.isRequired,
	onChange: PropTypes.func
};

export default CheckboxGroup;
