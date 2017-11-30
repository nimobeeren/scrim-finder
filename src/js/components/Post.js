import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PostActions from './PostActions';
import PostMapPool from './PostMapPool';

import '../../styles/components/Post.css';

class Post extends Component {
	static serverState(state) {
		if (typeof state === 'undefined') {
			return "On/Off";
		}
		return state ? "On" : "Off";
	}

	render() {
		const title = this.props.teamName || "Anonymous",
			level = this.props.level,
			maps = this.props.maps,
			server = Post.serverState(this.props.server);

		return (
			<div className="post">
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
			</div>
		);
	}
}

Post.propTypes = {
	teamName: PropTypes.string,
	level: PropTypes.string.isRequired,
	maps: PropTypes.object,
	server: PropTypes.bool
};

export default Post;
