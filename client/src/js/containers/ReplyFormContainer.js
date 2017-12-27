import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { sendReply, cancelReplyDraft } from "../actions/PostReplyActions";
import ReplyForm from "../components/ReplyForm";


class ReplyFormContainer extends Component {
	constructor(props) {
		super(props);
		this.handleSend = this.handleSend.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleSend(e) {
		const { activePost, currentUser, filters } = this.props;

		// Get values from form
		let map = e.target.querySelector('.post-reply-form__map').value,
			message = e.target.querySelector('.post-reply-form__message').value;

		this.props.sendReply(activePost._id, {
			author: currentUser.id,
			type: 'request',
			body: { map, message }
		}, filters);

		// Don't reload the page
		e.preventDefault();
	}

	handleCancel(e) {
		const { cancelReply } = this.props;

		// Close the popup
		document.querySelector('.popup__wrapper').classList.add('popup__wrapper--slideout');
		document.querySelector('.popup__background').classList.add('popup__background--fadeout');
		setTimeout(cancelReply, 300); // wait for animation to end
		e.preventDefault();
	}

	render() {
		const { activePost, allMaps } = this.props;
		let { teamName, maps } = activePost.body;

		// Fill in anonymous when team name is empty
		if (!teamName) {
			activePost.body.teamName = "Anonymous";
		}

		// If no maps are specified, assume all maps
		if (!Array.isArray(maps) || maps.length === 0) {
			activePost.body.maps = allMaps;
		}

		return (
			<ReplyForm
				post={activePost}
				onSend={this.handleSend}
				onCancel={this.handleCancel}/>
		);
	}
}

function mapStateToProps(state) {
	return {
		activePost: state.activePost,
		allMaps: state.mapNames,
		currentUser: state.currentUser,
		filters: state.filters
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		sendReply,
		cancelReply: cancelReplyDraft
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyFormContainer);
