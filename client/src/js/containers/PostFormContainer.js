import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { cancelPostDraft, createPost } from '../actions/CreatePostActions';
import PostForm from "../components/PostForm";

class PostFormContainer extends Component {
	constructor(props) {
		super(props);

		// Bind event handlers
		this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
		this.handleLevelChange = this.handleLevelChange.bind(this);
		this.handleMapsChange = this.handleMapsChange.bind(this);
		this.handleServerChange = this.handleServerChange.bind(this);
		this.handleIPChange = this.handleIPChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		// Set default state
		this.state = {
			teamName: "",
			level: 1, // FIXME: No guarantee that this matches UI state
			maps: [],
			server: null,
			ip: null,
			password: null
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

	handleIPChange(e) {
		this.setState({
			ip: e.target.value
		});
	}

	handlePasswordChange(e) {
		this.setState({
			password: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		const { currentUser, filters, createPost } = this.props;
		const { teamName, level, maps, server, ip, password } = this.state;
		let fail = false;

		// Validate map selection
		if (maps.length === 0) {
			document.getElementById('new-post-maps').className = 'invalid';
			fail = true;
		} else {
			document.getElementById('new-post-maps').className = '';
		}

		// Validate server IP/PW
		let validServer = true;
		if (server || server === null) {
			const ipExp = /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/;
			const passwordExp = /.+/;
			if (!ipExp.test(ip) || !passwordExp.test(password)) {
				validServer = false;
			}
		}
		if (!validServer) {
			document.getElementById('new-post-server').className = 'invalid';
			fail = true;
		} else {
			document.getElementById('new-post-server').className = '';
		}

		// Don't submit if form did not validate
		if (fail) {
			return;
		}

		// Create new post
		createPost({
				author: currentUser.id,
				body: {
					teamName,
					level,
					maps,
					server,
					ip,
					password
				}
			},
			filters
		);
	}

	render() {
		const { server } = this.state;
		return <PostForm
			shouldHaveIPPW={server || server === null}
			onSubmit={this.handleSubmit}
			onTeamNameChange={this.handleTeamNameChange}
			onLevelChange={this.handleLevelChange}
			onMapsChange={this.handleMapsChange}
			onServerChange={this.handleServerChange}
			onIPChange={this.handleIPChange}
			onPasswordChange={this.handlePasswordChange}
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
