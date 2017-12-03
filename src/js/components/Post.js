import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/Post.css';

import Card from './Card';
import PostMapPool from './PostMapPool';
import PostActions from './PostActions';

class Post extends Component {
	serverState() {
		if (typeof this.props.server === 'undefined') {
			return "On/Off";
		}
		return this.props.server ? "On" : "Off";
	}

	render() {
		const title = this.props.teamName,
			level = this.props.level,
			maps = this.props.maps,
			server = this.serverState();

		return (
			<Card className="card">
				<h3>{title}</h3>
				<div className="post__age">10 minutes ago</div>
				<table><tbody>
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
	server: PropTypes.bool
};
Post.defaultProps = {
	teamName: "Anonymous",
	level: "High",
	maps: [],
};

export default Post;
