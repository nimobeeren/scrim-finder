import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {createPost, cancelPost} from '../actions/CreatePostActions';
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
			level: "Medium",
			maps: [],
			server: 'any'
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
		this.setState({
			server: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const {maps} = this.state;

		// Validate form
		if (maps.length === 0) {
			document.getElementById('new-post-maps').className = 'invalid';
			return;
		}

		// Create new post
		this.props.createPost({
			post: this.state,
			filters: this.props.filters
		});
	}

	createLevelRadioButtons() {
		const {levels} = this.props;
		const items = levels.map(level => {
			return {
				value: level,
				label: level
			}
		});
		return <RadioGroup
			items={items}
			defaultItem={"Medium"}
			onChange={this.handleLevelChange}/>;
	}

	createMapCheckboxes() {
		const {maps} = this.props;
		const items = maps.map(mapName => {
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
		levels: state.allLevels,
		maps: state.allMaps,
		filters: state.filters
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createPost,
		handleCancel: cancelPost
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
