import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/PostMapPool.css';


const PostMapPool = (props) => {
	let sortedMaps;
	if (Array.isArray(props.maps) && props.maps.length > 0) {
		sortedMaps = props.maps.sort();
	} else {
		sortedMaps = ["any"];
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

PostMapPool.propTypes = {
	maps: PropTypes.array
};
PostMapPool.defaultProps = {
	maps: []
};

export default PostMapPool;
