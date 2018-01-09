import React from 'react';
import PropTypes from 'prop-types';

import RadioGroup from "./RadioGroup";


const LevelInputsSingle = ({ levelNames, onChange }) => {
	const items = levelNames.map((level, i) => {
		return {
			value: i,
			label: level
		}
	});
	return <RadioGroup
		items={items}
		defaultItem={"1"}
		onChange={onChange}/>;
};

LevelInputsSingle.propTypes = {
	levelNames: PropTypes.array.isRequired,
	onChange: PropTypes.func
};

export default LevelInputsSingle;
