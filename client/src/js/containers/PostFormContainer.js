import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createPost, cancelPostDraft } from '../actions/CreatePostActions';
import PostForm from "../components/PostForm";


class PostFormContainer extends Component {
	constructor(props) {
		super(props);

		// Bind event handlers
		this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
		this.handleLevelChange = this.handleLevelChange.bind(this);
		this.handleMapsChange = this.handleMapsChange.bind(this);
		this.handleServerChange = this.handleServerChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		// Set default state
		this.state = {
			teamName: "",
			level: 1, // FIXME: No guarantee that this matches UI state
			maps: [],
			server: null
		}
	}

	handleTeamNameChange(e) {
		this.setState({
			teamName: e.target.value
		});
	}

	handleLevelChange(e) {
		this.setState({
			level: e.target.value
		});
	}

	handleMapsChange(e, state) {
		this.setState({
			maps: state.checkedItems
		});
	}

	handleServerChange(e) {
		let newServer;
		switch (e.target.value) {
			case 'on':
				newServer = true;
				break;
			case 'off':
				newServer = false;
				break;
			default:
				newServer = null;
		}

		this.setState({
			server: newServer
		});
	}

	handleSubmit(e) {
		const { currentUser, filters, createPost } = this.props;
		const { teamName, level, maps, server } = this.state;

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
		return <PostForm
			onSubmit={this.handleSubmit}
			onTeamNameChange={this.handleTeamNameChange}
			onLevelChange={this.handleLevelChange}
			onMapsChange={this.handleMapsChange}
			onServerChange={this.handleServerChange}
			onCancel={this.props.handleCancel}/>;
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		filters: state.filters
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createPost,
		handleCancel: cancelPostDraft
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormContainer);
