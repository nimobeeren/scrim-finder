import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { sendReply, cancelReplyDraft } from "../actions/PostReplyActions";
import ReplyForm from "../components/ReplyForm";


class ReplyFormContainer extends Component {
	constructor(props) {
		super(props);

		// Bind event handlers
		this.handleMapChange = this.handleMapChange.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		// Set default state
		const defaultMap = this.props.activePost.body.maps[0]; // FIXME: No guarantee that this matches UI state
		console.log('setting default map', defaultMap);
		this.state = {
			map: defaultMap,
			message: null
		}
	}

	handleMapChange(e) {
		console.log('setting map', e.target.value);
		this.setState({
			map: e.target.value
		});
	}

	handleMessageChange(e) {
		this.setState({
			message: e.target.value
		});
	}

	handleSubmit(e) {
		const { activePost, currentUser, filters } = this.props;
		const { map, message } = this.state;

		this.props.sendReply(activePost._id, {
			author: currentUser.id,
			type: 'request',
			body: { map, message }
		}, filters);

		// Don't reload the page
		e.preventDefault();
	}

	handleCancel(e) {
		// Close the popup
		document.querySelector('.popup__wrapper').classList.add('popup__wrapper--slideout');
		document.querySelector('.popup__background').classList.add('popup__background--fadeout');
		setTimeout(this.props.cancelReply, 300); // wait for animation to end
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
				onMapChange={this.handleMapChange}
				onMessageChange={this.handleMessageChange}
				onSubmit={this.handleSubmit}
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
