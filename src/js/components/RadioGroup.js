import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RadioGroup extends Component {
	constructor(props) {
		super(props);

		// Allow event handler to set component state
		this.handleChange = this.handleChange.bind(this);

		// Determine the item to be selected by default
		let selectedItem;
		const {items, defaultItem} = this.props;
		if (defaultItem && items[defaultItem]) {
			selectedItem = defaultItem;
		} else {
			selectedItem = Object.keys(items)[0];
		}

		// Set the selected item
		this.state ={
			selectedItem: selectedItem
		};
	}

	handleChange(e) {
		// Set the selected item
		this.setState({
			selectedItem: e.target.value
		});

		// Call the passed event handler
		const handler = this.props.onChange;
		if (typeof handler === 'function') {
			handler(e);
		}
	}

	createRadioButtons() {
		let radioButtons = [];
		const items = this.props.items;

		for (let itemKey in items) {
			if (items.hasOwnProperty(itemKey)) {
				radioButtons.push((
					<label key={itemKey}>
						<input
							type="radio"
							value={itemKey}
							checked={this.state.selectedItem === itemKey}
							onChange={this.handleChange}/>
						{items[itemKey]}
					</label>
				))
			}
		}
		return radioButtons;
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
	items: PropTypes.object.isRequired,
	defaultItem: PropTypes.string,
	onChange: PropTypes.func
};

export default RadioGroup;
