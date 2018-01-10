import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { acceptRequest, declineRequest } from "../actions/PostRequestActions";
import Reply from "../components/Reply";
import '../../styles/ReplyList.css';

const ReplyList = (props) => {
	const { post, isPostAuthor, expanded, filters, acceptRequest, declineRequest } = props,
		replies = post.replies;

	if (expanded) {
		let replyElements;
		if (!replies || replies.length === 0) {
			// Give feedback when are no replies
			replyElements = <div className="replies__reply"><i>No replies found</i></div>;
		} else {
			replyElements = replies.map(reply => {
				// Whether there exits an accept reply directed to this reply's author
				const accepted = post.replies.some(r =>
					r.type === 'accept' && r.recipient === reply.author);

				// Whether there exits a decline reply directed to this reply's author
				const declined = post.replies.some(r =>
					r.type === 'decline' && r.recipient === reply.author);

				let status;
				if (accepted) {
					status = 'ACCEPTED';
				} else if (declined) {
					status = 'DECLINED'
				}

				return <Reply
					key={reply._id}
					reply={reply}
					isPostAuthor={isPostAuthor}
					status={status}
					onAccept={() => acceptRequest(reply, post, filters)}
					onDecline={() => declineRequest(reply, post, filters)}/>
			});
		}

		return (
			<div className={"replies" + (expanded ? " replies--expanded" : "")}>
				{replyElements}
			</div>
		);
	} else {
		return null;
	}
};

ReplyList.propTypes = {
	post: PropTypes.object.isRequired,
	isPostAuthor: PropTypes.bool,
	expanded: PropTypes.bool,
};
ReplyList.defaultProps = {
	isPostAuthor: false,
	expanded: false
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		filters: state.filters
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		acceptRequest,
		declineRequest
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyList);
