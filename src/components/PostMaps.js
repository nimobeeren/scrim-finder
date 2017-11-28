import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PostMaps extends Component {
	static propTypes = {
		maps: PropTypes.object
	};

	render() {
		let stringMaps;
		if (this.props.maps) {
			let sortedMaps = this.props.maps.sort();
			stringMaps = sortedMaps.reduce((s, map) => s + ", " + map);
		} else {
			stringMaps = "any";
		}

		return (
			<tr>
				<td>Maps</td>
				<td>{stringMaps}</td>
			</tr>
		);
	}
}
