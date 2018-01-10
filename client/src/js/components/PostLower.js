import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReplyList from '../containers/ReplyList';
import ReplyButton from "../containers/ReplyButton";
import ReplyCountContainer from '../containers/ReplyCountContainer';
import '../../styles/components/PostLower.css';

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
		const { post, isPostAuthor } = this.props,
			{ expanded } = this.state;

		return (
			<div>
				<div className="lower__controls">
					<ReplyButton post={post}/>
					<ReplyCountContainer
						replies={post.replies}
						expanded={expanded}
						onClick={this.toggleExpandReplies}/>
				</div>
				<ReplyList
					post={post}
					isPostAuthor={isPostAuthor}
					expanded={expanded}/>
			</div>
		);
	}
}

PostLower.propTypes = {
	post: PropTypes.object.isRequired,
	isPostAuthor: PropTypes.bool
};
PostLower.defaultProps = {
	isPostAuthor: false
};

export default PostLower;
