import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropDown extends Component {
	constructor(props) {
		super(props);

		// Bind methods
		this.handleChange = this.handleChange.bind(this);
		this.shouldBeSelected = this.shouldBeSelected.bind(this);

		// Determine the item to be selected by default
		let selectedItem;
		const { items, defaultItem } = this.props;
		selectedItem = defaultItem || items[0].value;

		// Set the selected item
		this.state = {
			selectedItem: selectedItem
		};
	}

	handleChange(e) {
		// Set the selected item
		this.setState({
			selectedItem: e.target.value
		});

		// Call the passed event handler
		const { onChange } = this.props;
		if (typeof onChange === 'function') {
			onChange(e);
		}
	}

	shouldBeSelected(item) {
		return this.state.selectedItem === item.value.toString();
	}

	render() {
		const { items, onChange } = this.props;
		return (
			<select onChange={onChange}>
				{items.map(item => (
					<option key={item} value={item}>{item}</option>
				))}
			</select>
		);
	}
}

DropDown.propTypes = {
	items: PropTypes.array.isRequired,
	defaultItem: PropTypes.string,
	onChange: PropTypes.func
};

export default DropDown;
