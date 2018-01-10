import React from 'react';
import PropTypes from 'prop-types';

import Card from "./Card";
import DropDown from "./DropDown";
import SubmitButton from "./SubmitButton";
import Button from './Button';
import '../../styles/components/ReplyForm.css';


// TODO: DropDown autoFocus, required
const ReplyForm = ({ post, onMapChange, onMessageChange, onSubmit, onCancel }) => (
	<Card className="card" title={"Replying to " + post.body.teamName}>
		<form className="post-reply-form" onSubmit={onSubmit}>
			<h4>What map do you want to play?</h4>
			<DropDown items={post.body.maps} onChange={onMapChange}/>
			<h4>Add a message (optional)</h4>
			<textarea className="post-reply-form__message" placeholder="Your message" onChange={onMessageChange}/>
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
	onMapChange: PropTypes.func,
	onMessageChange: PropTypes.func,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func
};

export default ReplyForm;
