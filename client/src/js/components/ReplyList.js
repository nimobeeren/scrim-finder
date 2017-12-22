import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/ReplyList.css';
import Reply from "./Reply";


class ReplyList extends Component {
	renderReplies() {
		const { post, currentUser, pendingReply, onAccept, onDecline } = this.props,
			replies = post.replies;

		// Give feedback when are no replies
		if (!replies || replies.length === 0) {
			return <div className="replies__reply"><i>No replies found</i></div>;
		}

		return replies.map(reply =>
			<Reply
				key={reply._id}
				reply={reply}
				post={post}
				currentUser={currentUser}
				pending={pendingReply}
				onAccept={onAccept}
				onDecline={onDecline}/>
		)
	}

	render() {
		return (
			<div className={"replies" + (this.props.expanded ? " replies--expanded" : "")}>
				{this.renderReplies()}
			</div>
		);
	}
}

ReplyList.propTypes = {
	expanded: PropTypes.bool,
	post: PropTypes.object,
	currentUser: PropTypes.object,
	pendingReply: PropTypes.bool,
	onAccept: PropTypes.func,
	onDecline: PropTypes.func
};

export default ReplyList;
