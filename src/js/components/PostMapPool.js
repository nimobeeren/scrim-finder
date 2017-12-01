import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/PostMapPool.css';

class PostMapPool extends Component {
	render() {
		let sortedMaps;
		if (Array.isArray(this.props.maps) && this.props.maps.length > 0) {
			sortedMaps = this.props.maps.sort();
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
	}
}

PostMapPool.propTypes = {
	maps: PropTypes.array
};
PostMapPool.defaultProps = {
	maps: []
};

export default PostMapPool;
