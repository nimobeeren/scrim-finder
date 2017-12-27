import React from 'react';
import PropTypes from 'prop-types';

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
				<div className="post-form__controls">
					<div className="post-form__btn-wrapper">
						<SubmitButton className="btn" label="Create"/>
					</div>
					<div className="post-form__btn-wrapper">
						<Button className="btn" label="Cancel" onClick={this.props.handleCancel}/>
					</div>
				</div>
			</form>
		);
	}
}

PostForm.propTypes = {};
PostForm.defaultProps = {};

export default PostForm;
