import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/RadioGroup.css';


class RadioGroup extends Component {
	constructor(props) {
		super(props);

		// Allow event handler to set component state
		this.handleChange = this.handleChange.bind(this);

		// Determine the item to be selected by default
		let selectedItem;
		const {items, defaultItem} = this.props;
		selectedItem = defaultItem || items[0].value;

		// Set the selected item
		this.state = {
			selectedItem: selectedItem
		};
	}

	handleChange(e) {
		// Set the selected item
		const newState = {
			selectedItem: e.target.value
		};
		this.setState(newState);

		// Call the passed event handler
		const {onChange} = this.props;
		if (typeof onChange === 'function') {
			onChange(e, newState);
		}
	}

	createRadioButtons() {
		const {items} = this.props;

		return items.map(item => (
			<label className="radio" key={item.value}>
				<input
					type="radio"
					value={item.value}
					checked={this.state.selectedItem === item.value}
					onChange={this.handleChange}/>
				{item.label}
			</label>
		));
	}

	render() {
		return (
			<div>
				{this.createRadioButtons()}
			</div>
		);
	}
}

RadioGroup.propTypes = {
	items: PropTypes.array.isRequired,
	defaultItem: PropTypes.string,
	onChange: PropTypes.func
};

export default RadioGroup;
