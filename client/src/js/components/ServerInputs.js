import React from 'react';
import PropTypes from 'prop-types';

import RadioGroup from "./RadioGroup";


const ServerInputs = ({ onChange }) => (
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

ServerInputs.propTypes = {
	onChange: PropTypes.func
};

export default ServerInputs;
