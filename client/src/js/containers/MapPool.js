import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Map from '../components/Map';


const MapPool = (props) => {
	const { maps, allMaps } = props;

	let sortedMaps;
	if (!Array.isArray(maps) || !maps.length) {
		// No maps are given
		sortedMaps = ["any"];
	} else if (allMaps.every(map => maps.includes(map))) {
		// All known maps are given
		sortedMaps = ["any"];
	} else {
		// Some maps are given
		sortedMaps = maps.sort();
	}

	return sortedMaps.map((map, i) =>
		<Map name={map} key={i}/>
	);
};

function mapStateToProps(state) {
	return {
		allMaps: state.mapNames
	};
}

MapPool.propTypes = {
	maps: PropTypes.array
};
MapPool.defaultProps = {
	maps: ["any"]
};

export default connect(mapStateToProps)(MapPool);
