import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReplyListContainer from '../containers/ReplyListContainer';
import ReplyButton from "../containers/ReplyButton";
import ReplyCountContainer from '../containers/ReplyCountContainer';
import '../../styles/PostLower.css';

class PostLower extends Component {
	constructor() {
		super();

		this.toggleExpandReplies = this.toggleExpandReplies.bind(this);

		this.state = {
			expanded: false
		};
	}

	toggleExpandReplies() {
		this.setState({
			expanded: !this.state.expanded
		});
	}

	render() {
		const { post } = this.props,
			{ expanded } = this.state;

		return (
			<div className="controls-container">
				<div className="lower__controls">
					<ReplyButton post={post}/>
					<ReplyCountContainer
						replies={post.replies}
						expanded={expanded}
						onClick={this.toggleExpandReplies}/>
				</div>
				<ReplyListContainer
					post={post}
					expanded={expanded}/>
			</div>
		);
	}
}

PostLower.propTypes = {
	post: PropTypes.object.isRequired,
	isPostAuthor: PropTypes.bool
};

export default PostLower;
