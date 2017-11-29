import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/PostMapPool.css';

export default class PostMapPool extends Component {
	static propTypes = {
		maps: PropTypes.array
	};

	render() {
		let sortedMaps;
		if (Array.isArray(this.props.maps)) {
			sortedMaps = this.props.maps.sort();
		} else {
			sortedMaps = ["any"];
		}

		return (
			<td>
				{
					sortedMaps.map(map =>
						<div className="map">{map}</div>
					)
				}
			</td>
		);
	}
}
