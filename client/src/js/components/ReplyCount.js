import React from 'react'
import PropTypes from 'prop-types';

import '../../styles/components/ReplyCount.css';


function getRealReplyCount(replies, currentUser) {
	return replies.reduce((count, reply) => {
		// TODO: Don't send this reply to the client at all
		if (!reply.recipient || reply.recipient === currentUser.id) {
			return count + 1;
		}
		return count;
	}, 0);
}

const ReplyCount = (props) => {
	const count = getRealReplyCount(props.replies, props.currentUser);
	return (
		<div className="reply-count" onClick={props.onClick}>
			<div className="reply-count__label">
				{count} repl{count === 1 ? 'y' : 'ies'}
			</div>
			<div className={"reply-count__chevron" + (props.expanded ? " chevron--expanded" : "")}/>
		</div>
	);
};

ReplyCount.propTypes = {
	expanded: PropTypes.bool,
	replies: PropTypes.array,
	currentUser: PropTypes.object,
	onClick: PropTypes.func
};

export default ReplyCount;
