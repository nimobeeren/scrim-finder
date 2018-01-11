import React from 'react';
import PropTypes from 'prop-types';
import Reply from "./Reply";
import '../../styles/ReplyList.css';

const ReplyList = ({ post, isPostAuthor, expanded, onAccept, onDecline }) => {
	const replies = post.replies;

	let replyElements;
	if (!replies || replies.length === 0) {
		// Give feedback when are no replies
		replyElements = <div className="replies__reply"><i>No replies found</i></div>;
	} else {
		replyElements = replies.map(reply => {
			// Whether there exits an accept reply directed to this reply's author
			const accepted = replies.some(r =>
				r.type === 'accept' && r.recipient === reply.author);

			// Whether there exits a decline reply directed to this reply's author
			const declined = replies.some(r =>
				r.type === 'decline' && r.recipient === reply.author);

			let status;
			if (accepted) {
				status = 'ACCEPTED';
			} else if (declined) {
				status = 'DECLINED';
			}

			return <Reply
				key={reply._id}
				reply={reply}
				isPostAuthor={isPostAuthor}
				status={status}
				onAccept={() => onAccept(reply)}
				onDecline={() => onDecline(reply)}/>
		});
	}

	return (
		<div className={"replies" + (expanded ? " replies--expanded" : "")}>
			{replyElements}
		</div>
	);
};

ReplyList.propTypes = {
	post: PropTypes.object.isRequired,
	isPostAuthor: PropTypes.bool,
	expanded: PropTypes.bool,
	onAccept: PropTypes.func,
	onDecline: PropTypes.func
};

export default ReplyList;
