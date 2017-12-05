import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {createPost, cancelPost} from '../actions/CreatePostActions';
import CheckboxGroup from '../components/CheckboxGroup';
import RadioGroup from '../components/RadioGroup';
import Button from '../components/Button';


class PostForm extends Component {
	createLevelCheckboxes() {
		const {levels} = this.props;
		const items = levels.map(level => {
			return {
				value: level.toLowerCase(),
				label: level,
				isChecked: false
			}
		});
		return <CheckboxGroup items={items}/>;
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
		return <CheckboxGroup items={items}/>;
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
			defaultItem={'any'}/>;
	}

	render() {
		return (
			<div>
				<h3>Create a post</h3>
				<fieldset>
					<legend>Team Name</legend>
					<input type="text"/>
				</fieldset>
				<fieldset>
					<legend>Level</legend>
					{this.createLevelCheckboxes()}
				</fieldset>
				<fieldset>
					<legend>Maps</legend>
					{this.createMapCheckboxes()}
				</fieldset>
				<fieldset>
					<legend>Server</legend>
					{this.createServerRadioButtons()}
				</fieldset>
				<div className="popup-btn-wrapper">
					<Button label="Create" onClick={this.props.handleCreate}/>
				</div>
				<div className="popup-btn-wrapper">
					<Button label="Cancel" onClick={this.props.handleCancel}/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		levels: state.allLevels,
		maps: state.allMaps
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		handleCreate: createPost,
		handleCancel: cancelPost
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
