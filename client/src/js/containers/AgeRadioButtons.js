import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from "../components/RadioGroup";

const AgeRadioButtons = ({ onChange }) => (
	<RadioGroup
		items={[
			{
				value: '5mins',
				label: "< 5 mins"
			},
			{
				value: '15mins',
				label: "< 15 mins"
			},
			{
				value: '1hour',
				label: "< 1 hour"
			},
			{
				value: '3hours',
				label: "< 3 hours"
			},
			{
				value: 'any',
				label: "Any"
			}
		]}
		defaultItem={'any'}
		onChange={onChange}/>
);

AgeRadioButtons.propTypes = {
	onChange: PropTypes.func
};

export default AgeRadioButtons;
