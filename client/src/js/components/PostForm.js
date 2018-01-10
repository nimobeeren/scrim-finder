import React from 'react';
import PropTypes from 'prop-types';
import LevelRadioButtons from "../containers/LevelRadioButtons";
import MapCheckboxes from "../containers/MapCheckboxes";
import ServerRadioButtons from "../containers/ServerRadioButtons";
import SubmitButton from "./SubmitButton";
import Button from "./Button";
import '../../styles/PostForm.css';

const PostForm = ({ onTeamNameChange, onLevelChange, onMapsChange, onServerChange, onSubmit, onCancel }) => (
	<form className="post-form" onSubmit={onSubmit}>
		<fieldset>
			<legend>Team Name</legend>
			<input
				type="text"
				placeholder="Anonymous"
				autoFocus
				onChange={onTeamNameChange}/>
		</fieldset>
		<fieldset>
			<legend>Level</legend>
			<LevelRadioButtons
				onChange={onLevelChange}/>
		</fieldset>
		<fieldset id="new-post-maps">
			<legend>Maps</legend>
			<MapCheckboxes
				onChange={onMapsChange}/>
		</fieldset>
		<fieldset>
			<legend>Server</legend>
			<ServerRadioButtons onChange={onServerChange}/>
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

PostForm.propTypes = {
	onTeamNameChange: PropTypes.func,
	onLevelChange: PropTypes.func,
	onMapsChange: PropTypes.func,
	onServerChange: PropTypes.func,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func
};

export default PostForm;
