import React, { Component } from 'react';

export default class PostMaps extends Component {
	render() {
		let sortedMaps = this.props.maps.sort();
		let stringMaps = sortedMaps.reduce((s, map) => s + ', ' + map);
		return (
			<tr>
				<td>Maps</td>
				<td>{stringMaps}</td>
			</tr>
		);
	}
}
