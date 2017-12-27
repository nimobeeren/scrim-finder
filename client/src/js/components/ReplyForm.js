import React from 'react';
import PropTypes from 'prop-types';

import Card from "./Card";
import SubmitButton from "./SubmitButton";
import Button from './Button';
import '../../styles/components/ReplyForm.css';


const ReplyForm = ({ post, onSend, onCancel }) => (
	<Card className="card" title={"Replying to " + post.body.teamName}>
		<form className="post-reply-form" onSubmit={onSend}>
			<h4>What map do you want to play?</h4>
			<select className="post-reply-form__map" autoFocus required>
				{post.body.maps.map(mapName => (
					<option key={mapName} value={mapName}>{mapName}</option>
				))}
			</select>
			<h4>Add a message (optional)</h4>
			<textarea className="post-reply-form__message" placeholder="Your message"/>
			<div className="post-reply-form__btn-wrapper">
				<SubmitButton className="btn" label="Send"/>
			</div>
			<div className="post-reply-form__btn-wrapper">
				<Button className="btn" label="Cancel" onClick={onCancel}/>
			</div>
		</form>
	</Card>
);

ReplyForm.propTypes = {
	post: PropTypes.object.isRequired,
	onSend: PropTypes.func,
	onCancel: PropTypes.func
};

export default ReplyForm;
