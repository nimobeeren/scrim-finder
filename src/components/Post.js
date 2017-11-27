import React, { Component } from 'react';

import PostActions from './PostActions';
import PostMaps from './PostMaps';

import './styles/Post.css';

export default class Post extends Component {
	render() {
		return (
			<div className={"post"}>
				<h3>{this.props.teamName}</h3>
				<div className={"post__age"}>10 minutes ago</div>
				<table>
					<tr>
						<td>Level</td>
						<td>{this.props.level}</td>
					</tr>
					<PostMaps maps={this.props.maps} />
					<tr>
						<td>Server</td>
						<td>{this.props.server ? "On" : "Off"}</td>
					</tr>
				</table>
				<PostActions />
			</div>
		);
	}
}
