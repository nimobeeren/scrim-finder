import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LevelInputsSingle from "./LevelInputsSingle";
import MapInputs from "./MapInputs";
import ServerInputs from "./ServerInputs";
import SubmitButton from "./SubmitButton";
import Button from "./Button";
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
		this.props.onSubmit(e, this.state);
	}

	render() {
		const { levelNames, mapNames, onCancel } = this.props;
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
					<LevelInputsSingle
						levelNames={levelNames}
						onChange={this.handleLevelChange}/>
				</fieldset>
				<fieldset id="new-post-maps">
					<legend>Maps</legend>
					<MapInputs
						mapNames={mapNames}
						onChange={this.handleMapsChange}/>
				</fieldset>
				<fieldset>
					<legend>Server</legend>
					<ServerInputs onChange={this.handleServerChange}/>
				</fieldset>
				<div className="post-form__controls">
					<div className="post-form__btn-wrapper">
						<SubmitButton className="btn" label="Create"/>
					</div>
					<div className="post-form__btn-wrapper">
						<Button className="btn" label="Cancel" onClick={onCancel}/>
					</div>
				</div>
			</form>
		);
	}
}

PostForm.propTypes = {
	levelNames: PropTypes.array.isRequired,
	mapNames: PropTypes.array.isRequired,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func
};

export default PostForm;
