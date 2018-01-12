import React from 'react';
import PropTypes from 'prop-types';
import Card from "./Card";
import ServerRadioButtons from "../containers/ServerRadioButtons";
import ServerDetailsInput from "./ServerDetailsInput";
import DropDown from "./DropDown";
import SubmitButton from "./SubmitButton";
import Button from './Button';
import '../../styles/ReplyForm.css';

const ReplyForm = ({ post, shouldHaveIPPW, onServerChange, onIPChange, onPasswordChange, onMapChange, onMessageChange, onSubmit, onCancel }) => (
	<Card className="card" title={"Replying to " + post.body.teamName}>
		<form className="post-reply-form" onSubmit={onSubmit}>
			{
				post.body.server === null &&
				<div>
					<h4>What server do you want to play?</h4>
					<ServerRadioButtons allowUndecided={false} onChange={onServerChange}/>
					{
						shouldHaveIPPW &&
						<ServerDetailsInput
							onIPChange={onIPChange}
							onPasswordChange={onPasswordChange}/>
					}
				</div>
			}
			{
				post.body.server === false &&
				<div>
					<h4>Enter your server details</h4>
					<ServerDetailsInput
						onIPChange={onIPChange}
						onPasswordChange={onPasswordChange}/>
				</div>
			}

			<h4>What map do you want to play?</h4>
			<DropDown items={post.body.maps} onChange={onMapChange} autoFocus required/>

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
	shouldHaveIPPW: PropTypes.bool,
	onServerChange: PropTypes.func,
	onIPChange: PropTypes.func,
	onPasswordChange: PropTypes.func,
	onMapChange: PropTypes.func,
	onMessageChange: PropTypes.func,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func
};

export default ReplyForm;
