import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from '../components/Card';
import PostMapPool from './PostMapPool';
import PostControls from './PostControls';
import '../../styles/containers/Post.css';


class Post extends Component {
	static getAgeString(createdAt) {
		const age = Date.now() - new Date(createdAt);

		let seconds = age / 1000;
		if (seconds < 30) {
			return "Just now";
		}
		if (seconds < 60) {
			let floored = Math.floor(seconds);
			return `${floored} seconds ago`;
		}

		let minutes = seconds / 60;
		if (minutes < 60) {
			let floored = Math.floor(minutes);
			return `${floored} minute${floored === 1 ? "" : "s"} ago`;
		}

		let hours = minutes / 60;
		if (hours < 24) {
			let floored = Math.floor(hours);
			return `${floored} hour${floored === 1 ? "" : "s"} ago`;
		}

		let days = hours / 24;
		let floored = Math.floor(days);
		return `${floored} day${floored === 1 ? "" : "s"} ago`;
	}

	static getLevelString(number, levelNames) {
		// Convert a number-based level to a string
		if (!number || Number.isNaN(number)
			|| number >= levelNames.length || number < 0) {
			number = 0;
		}
		return levelNames[number];
	}

	static getServerPrefString(server) {
		if (typeof server !== 'boolean') {
			return "On/Off";
		} else if (server) {
			return "On";
		} else {
			return "Off";
		}
	}

	render() {
		const { post } = this.props;

		const teamName = post.author,
			age = Post.getAgeString(post.createdAt),
			level = Post.getLevelString(post.body.level, this.props.levelNames),
			maps = post.body.maps,
			server = Post.getServerPrefString(post.body.server);

		return (
			<Card className="card" title={teamName} subtitle={age}>
				<table className="post__fields">
					<tbody>
					<tr>
						<td>Level:</td>
						<td>{level}</td>
					</tr>
					<tr>
						<td>Maps:</td>
						<PostMapPool maps={maps}/>
					</tr>
					<tr>
						<td>Server:</td>
						<td>{server}</td>
					</tr>
					</tbody>
				</table>
				<PostControls post={post}/>
			</Card>
		);
	}
}

function mapStateToProps(state) {
	return {
		levelNames: state.levelNames
	};
}

Post.propTypes = {
	post: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Post);
