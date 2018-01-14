import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import MapPool from '../containers/MapPool';
import PostLower from './PostLower';
import '../../styles/Post.css';

function getTeamNameString(teamName) {
	if (!teamName) {
		return "Anonymous";
	}
	return teamName;
}

function getAgeString(createdAt) {
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

function getLevelString(number, levelNames) {
	// Convert a number-based level to a string
	if (!number || Number.isNaN(number)
		|| number >= levelNames.length || number < 0) {
		number = 0;
	}
	return levelNames[number];
}

function getServerPrefString(server) {
	if (typeof server !== 'boolean') {
		return "On/Off";
	} else if (server) {
		return "On";
	} else {
		return "Off";
	}
}

const Post = ({ post, levelNames }) => {
	const teamName = getTeamNameString(post.body.teamName),
		age = getAgeString(post.createdAt),
		level = getLevelString(post.body.level, levelNames),
		maps = post.body.maps,
		server = getServerPrefString(post.body.server);

	return (
		<Card className="card" title={teamName} subtitle={age}>
			<table className="post__fields">
				<tbody>
				<tr>
					<td>Level:</td>
					<td>{level}</td>
				</tr>
				<tr className="maps">
					<td>Maps:</td>
					<td><MapPool maps={maps}/></td>
				</tr>
				<tr>
					<td>Server:</td>
					<td>{server}</td>
				</tr>
				</tbody>
			</table>
			<PostLower post={post}/>
		</Card>
	);
};

Post.propTypes = {
	post: PropTypes.object.isRequired,
	levelNames: PropTypes.array
};
Post.defaultProps = {
	levelNames: ["Unknown"]
};

export default Post;
