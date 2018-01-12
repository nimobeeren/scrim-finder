import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from "../components/RadioGroup";

const ServerRadioButtons = ({ allowUndecided, onChange }) => {
	let items = [];
	allowUndecided && items.push({
		value: 'any',
		label: "On/Off"
	});
	items.push({
		value: 'on',
		label: "On"
	}, {
		value: 'off',
		label: "Off"
	});

	return <RadioGroup
		items={items}
		defaultItem={allowUndecided && 'any'}
		onChange={onChange && (e => {
			switch (e.target.value) {
				case 'on':
					onChange(e, true);
					break;
				case 'off':
					onChange(e, false);
					break;
				default:
					onChange(e, null);
			}
		})}/>
};

ServerRadioButtons.propTypes = {
	allowUndecided: PropTypes.bool,
	onChange: PropTypes.func
};
ServerRadioButtons.defaultProps = {
	allowUndecided: true
};

export default ServerRadioButtons;
