import React from 'react';
import PropTypes from 'prop-types';

import CheckboxGroup from "./CheckboxGroup";


const MapInputs = ({ mapNames, onChange }) => {
	const items = mapNames.map(mapName => {
		return {
			value: mapName.toLowerCase(),
			label: mapName,
			isChecked: false
		}
	});
	return <CheckboxGroup
		items={items}
		onChange={onChange}/>;
};

MapInputs.propTypes = {
	mapNames: PropTypes.array.isRequired,
	onChange: PropTypes.func
};

export default MapInputs;
