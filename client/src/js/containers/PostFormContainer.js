import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createPost, cancelPostDraft } from '../actions/CreatePostActions';
import PostForm from "../components/PostForm";


class PostFormContainer extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e, formData) {
		const { filters, currentUser, createPost } = this.props;
		const { teamName, level, maps, server } = formData;

		// Validate form
		if (maps.length === 0) {
			document.getElementById('new-post-maps').className = 'invalid';
			return;
		}

		// Create new post
		createPost({
				author: currentUser.id,
				body: {
					teamName,
					level,
					maps,
					server
				}
			},
			filters
		);

		e.preventDefault();
	}

	render() {
		const { handleCancel } = this.props;
		return <PostForm
			onSubmit={this.handleSubmit}
			onCancel={handleCancel}/>;
	}
}

function mapStateToProps(state) {
	return {
		filters: state.filters,
		currentUser: state.currentUser
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createPost,
		handleCancel: cancelPostDraft
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormContainer);
