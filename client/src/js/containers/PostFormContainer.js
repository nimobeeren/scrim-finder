import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createPost, cancelPostDraft } from '../actions/CreatePostActions';
import CheckboxGroup from '../components/CheckboxGroup';
import RadioGroup from '../components/RadioGroup';
import Button from '../components/Button';
import SubmitButton from "../components/SubmitButton";


class PostFormContainer extends Component {
	handleSubmit(e) {
		const { teamName, level, maps, server } = this.state;
		const { currentUser } = this.props;

		// Validate form
		if (maps.length === 0) {
			document.getElementById('new-post-maps').className = 'invalid';
			return;
		}

		// Create new post
		this.props.createPost({
				author: currentUser.id,
				body: {
					teamName,
					level,
					maps,
					server
				}
			},
			this.props.filters
		);

		e.preventDefault();
	}

	render() {
		return (

		);
	}
}

function mapStateToProps(state) {
	return {
		levelNames: state.levelNames,
		mapNames: state.mapNames,
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
