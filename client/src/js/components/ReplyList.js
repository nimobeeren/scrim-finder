import React from 'react';
import PropTypes from 'prop-types';
import Reply from "./Reply";
import '../../styles/ReplyList.css';

const ReplyList = ({ replies, isPostAuthor, expanded, onAccept, onDecline }) => {
	let replyElements;

	if (!replies || replies.length === 0) {
		// Give feedback when are no replies
		replyElements = <div className="replies__reply"><i>No replies found</i></div>;
	} else {
		replyElements = replies.map(reply =>
			<Reply
				key={reply._id}
				reply={reply}
				isPostAuthor={isPostAuthor}
				onAccept={() => onAccept(reply)}
				onDecline={() => onDecline(reply)}/>
		);
	}

	return (
		<div className={"replies" + (expanded ? " replies--expanded" : "")}>
			{replyElements}
		</div>
	);
};

ReplyList.propTypes = {
	replies: PropTypes.array.isRequired,
	isPostAuthor: PropTypes.bool,
	expanded: PropTypes.bool,
	onAccept: PropTypes.func,
	onDecline: PropTypes.func
};

export default ReplyList;
