import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { acceptRequest, declineRequest } from "../actions/PostRequestActions";
import ReplyList from '../components/ReplyList';

const ReplyListContainer = ({ post, isPostAuthor, expanded, filters, acceptRequest, declineRequest }) => {
	return <ReplyList
		post={post}
		isPostAuthor={isPostAuthor}
		expanded={expanded}
		onAccept={reply => acceptRequest(reply, post, filters)}
		onDecline={reply => declineRequest(reply, post, filters)}/>;
};

ReplyListContainer.propTypes = {
	post: PropTypes.object.isRequired,
	isPostAuthor: PropTypes.bool,
	expanded: PropTypes.bool,
};

function mapStateToProps(state) {
	return {
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
