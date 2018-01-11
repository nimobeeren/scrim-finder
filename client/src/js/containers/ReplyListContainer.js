import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { acceptRequest, declineRequest } from "../actions/PostRequestActions";
import ReplyList from '../components/ReplyList';

const ReplyListContainer = ({ post, expanded, currentUser, filters, acceptRequest, declineRequest }) => {
	// Find replies with the current user as recipient, or no recipient at all
	// TODO: Don't send these replies to the client at all
	const myReplies = post.replies.filter(reply => {
		return !reply.recipient || reply.recipient === currentUser.id;
	});

	return <ReplyList
		replies={myReplies}
		isPostAuthor={!!currentUser && post.author === currentUser.id}
		expanded={expanded}
		onAccept={reply => acceptRequest(reply, post, filters)}
		onDecline={reply => declineRequest(reply, post, filters)}/>;
};

ReplyListContainer.propTypes = {
	post: PropTypes.object.isRequired,
	expanded: PropTypes.bool,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReplyListContainer);
