import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import PostMapPool from './PostMapPool';
import PostActions from './PostActions';
import '../../styles/components/Post.css';


class Post extends Component {
	getServerPrefString() {
		switch(this.props.server) {
			case 'on':
				return "On";
			case 'off':
				return "Off";
			default:
				return "On/Off";
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
		const title = this.props.teamName,
			level = this.props.level,
			maps = this.props.maps,
			server = this.getServerPrefString(),
			age = this.getAgeString();

		return (
			<Card className="card" title={title} subtitle={age}>
				<table className="post__fields"><tbody>
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
				</tbody></table>
				<PostActions/>
			</Card>
		);
	}
}

Post.propTypes = {
	teamName: PropTypes.string,
	level: PropTypes.string.isRequired,
	maps: PropTypes.array,
	server: PropTypes.string,
	created: PropTypes.number
};
Post.defaultProps = {
	teamName: "Anonymous",
	level: "High",
	maps: [],
	created: Date.now()
};

export default Post;
