import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from '../components/Card';
import PostMapPool from './PostMapPool';
import PostActions from './PostControls';
import '../../styles/components/Post.css';


class Post extends Component {
	getLevelString() {
		// Convert a number-based level to a string
		let number = this.props.level;
		if (!number || Number.isNaN(number)
			|| number >= this.props.levelNames.length || number < 0) {
			number = 0;
		}
		return this.props.levelNames[number];
	}

	getServerPrefString() {
		const {server} = this.props;
		if (typeof server !== 'boolean') {
			return "On/Off";
		} else if (server) {
			return "On";
		} else {
			return "Off";
		}
	}

	getAgeString() {
		let age = Date.now() - this.props.created;

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

	render() {
		let {teamName, maps} = this.props,
			level = this.getLevelString(),
			server = this.getServerPrefString(),
			age = this.getAgeString();

		// Make sure team name is not empty or only whitespace
		if (!teamName || teamName.match(/^ *$/) !== null) {
			teamName = "Anonymous";
		}

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
				<PostActions post={this.props}/>
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
	teamName: PropTypes.string,
	level: PropTypes.number,
	maps: PropTypes.array,
	server: PropTypes.bool,
	created: PropTypes.number
};
Post.defaultProps = {
	teamName: "Anonymous",
	level: 2,
	maps: [],
	created: Date.now()
};

export default connect(mapStateToProps)(Post);
