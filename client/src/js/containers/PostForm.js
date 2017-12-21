import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createPost, cancelPostDraft } from '../actions/CreatePostActions';
import CheckboxGroup from '../components/CheckboxGroup';
import RadioGroup from '../components/RadioGroup';
import Button from '../components/Button';
import SubmitButton from "../components/SubmitButton";
import '../../styles/containers/PostForm.css';


class PostForm extends Component {
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
			level: 0,
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
		e.preventDefault();
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
	}

	createLevelRadioButtons() {
		const { levelNames } = this.props;
		const items = levelNames.map((level, i) => {
			return {
				value: i,
				label: level
			}
		});
		return <RadioGroup
			items={items}
			defaultItem={"1"}
			onChange={this.handleLevelChange}/>;
	}

	createMapCheckboxes() {
		const { mapNames } = this.props;
		const items = mapNames.map(mapName => {
			return {
				value: mapName.toLowerCase(),
				label: mapName,
				isChecked: false
			}
		});
		return <CheckboxGroup
			items={items}
			onChange={this.handleMapsChange}/>;
	}

	createServerRadioButtons() {
		return <RadioGroup
			items={[
				{
					value: 'any',
					label: "On/Off"
				},
				{
					value: 'on',
					label: "On"
				},
				{
					value: 'off',
					label: "Off"
				}
			]}
			defaultItem={'any'}
			onChange={this.handleServerChange}/>;
	}

	render() {
		return (
			<form className="post-form" onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>Team Name</legend>
					<input
						type="text"
						placeholder="Anonymous"
						autoFocus
						onChange={this.handleTeamNameChange}/>
				</fieldset>
				<fieldset>
					<legend>Level</legend>
					{this.createLevelRadioButtons()}
				</fieldset>
				<fieldset id="new-post-maps">
					<legend>Maps</legend>
					{this.createMapCheckboxes()}
				</fieldset>
				<fieldset>
					<legend>Server</legend>
					{this.createServerRadioButtons()}
				</fieldset>
				<div className="post-form__btn-wrapper">
					<SubmitButton className="btn" label="Create"/>
				</div>
				<div className="post-form__btn-wrapper">
					<Button className="btn" label="Cancel" onClick={this.props.handleCancel}/>
				</div>
			</form>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
