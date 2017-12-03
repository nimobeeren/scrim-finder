import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './../../styles/components/Checkbox.css';

class Checkbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: this.props.isChecked
		};
		this.toggleChecked = this.toggleChecked.bind(this);
	}

	toggleChecked() {
		this.setState({
			isChecked: !this.state.isChecked
		});

		if (typeof this.props.onChange === 'function') {
			this.props.onChange();
		}

	}

	render() {
		return (
			<label>
				<input
					type="checkbox"
					value={this.props.label}
					checked={this.state.isChecked}
					onChange={this.toggleChecked}/>
				{this.props.label}
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
