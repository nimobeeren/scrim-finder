import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from "../components/RadioGroup";

const ServerRadioButtons = ({ onChange }) => (
	<RadioGroup
		items={[
			{
				value: 'any',
				label: "On/Off"
			},
			{
				value: 'on',
				label: "On"
			},
			{
				value: 'off',
				label: "Off"
			}
		]}
		defaultItem={'any'}
		onChange={onChange}/>
);

ServerRadioButtons.propTypes = {
	onChange: PropTypes.func
};

export default ServerRadioButtons;
