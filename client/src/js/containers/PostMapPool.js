import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import '../../styles/components/PostMapPool.css';


const PostMapPool = (props) => {
	const {maps: selectedMaps, allMaps} = props;

	let sortedMaps;
	if (!Array.isArray(selectedMaps) || !selectedMaps.length) {
		// No maps are given
		sortedMaps = ["any"];
	} else if (allMaps.every(map => selectedMaps.includes(map))) {
		// All known maps are given
		sortedMaps = ["any"];
	} else {
		// Some maps are given
		sortedMaps = selectedMaps.sort();
	}

	return (
		<td>
			{
				sortedMaps.map((map, i) =>
					<div className="map" key={"map" + i}>{map}</div>
				)
			}
		</td>
	);
};

function mapStateToProps(state) {
	return {
		allMaps: state.mapNames
	};
}

PostMapPool.propTypes = {
	maps: PropTypes.array
};
PostMapPool.defaultProps = {
	maps: []
};

export default connect(mapStateToProps)(PostMapPool);
