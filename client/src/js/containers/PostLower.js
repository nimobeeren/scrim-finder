import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { acceptRequest, declineRequest } from "../actions/PostRequestActions";
import { openReply } from "../actions/PostReplyActions";
import Button from '../components/Button';
import ReplyCount from '../components/ReplyCount';
import ReplyList from '../components/ReplyList';
import '../../styles/containers/PostLower.css';


class PostControls extends Component {
	constructor(props) {
		super(props);

		this.handleOpenReply = this.handleOpenReply.bind(this);
		this.toggleExpandReplies = this.toggleExpandReplies.bind(this);

		this.state = {
			expanded: false
		};
	}

	handleOpenReply() {
		this.props.openReply(this.props.post);
	}

	toggleExpandReplies() {
		this.setState({
			expanded: !this.state.expanded
		});
	}

	render() {
		const { post, currentUser, pendingReplyPosts, acceptRequest, declineRequest } = this.props,
			{ expanded } = this.state;

		let pendingReply = false;
		if (pendingReplyPosts.includes(post._id)) {
			pendingReply = true;
		}

		return (
			<div>
				<div className="lower__controls">
					<Button className="btn" label="GO" onClick={this.handleOpenReply}/>
					<ReplyCount
						expanded={expanded}
						replies={post.replies}
						currentUser={currentUser}
						onClick={this.toggleExpandReplies}/>
				</div>
				<ReplyList
					expanded={expanded}
					post={post}
					currentUser={currentUser}
					pendingReply={pendingReply}
					onAccept={acceptRequest}
					onDecline={declineRequest}/>
			</div>
		);
	}
}

PostControls.propTypes = {
	post: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		pendingReplyPosts: state.pendingReplyPosts
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openReply,
		acceptRequest,
		declineRequest
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostControls);
