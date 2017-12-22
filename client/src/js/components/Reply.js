import React from 'react';
import PropTypes from 'prop-types';

import Button from "./Button";


const Reply = (props) => {
	const { reply, post, currentUser, pending, onAccept, onDecline } = props;

	// Don't show reply if it is not meant for the current user
	if (reply.recipient && reply.recipient !== currentUser.id) {
		// TODO: Don't send this reply to the client at all
		return null;
	}

	// Check if current user is the author of the post this reply belongs to
	let isPostAuthor = false;
	if (currentUser) {
		isPostAuthor = (currentUser.id === post.author);
	}

	switch (reply.type) {
		// Request to play a map
		case 'request':
			// Whether there exits an accept reply directed to this reply's author
			const accepted = post.replies.some(r =>
				r.type === 'accept' && r.recipient === reply.author);

			// Whether there exits a decline reply directed to this reply's author
			const declined = post.replies.some(r =>
				r.type === 'decline' && r.recipient === reply.author);

			// Create section containing reply text
			let children = [(
				<div key="text" className={"reply__text" + (declined ? " reply--declined" : "")}>
					<span className="reply__author">{reply.author}</span>&nbsp;
					wants to play <span className="map">{reply.body.map}</span>
					{reply.body.message ? ": " : ""}
					<i>{reply.body.message}</i>
				</div>
			)];

			// Disable accept/decline buttons when a reply is pending
			let acceptButton, declineButton;
			if (pending) {
				acceptButton = (
					<Button
						className="btn btn--small"
						label="Accept"/>
				);
				declineButton = (
					<Button
						className="btn btn--small"
						label="Decline"/>
				)
			} else {
				acceptButton = (
					<Button
						className="btn btn--small"
						label="Accept"
						onClick={() => onAccept(reply, post)}/>
				);
				declineButton = (
					<Button
						className="btn btn--small"
						label="Decline"
						onClick={() => onDecline(reply, post)}/>
				);
			}

			if (accepted) {
				// Show accepted status
				children.push(
					<div key="status" className="reply__status">
						Accepted
					</div>
				);
			} else if (declined) {
				// Show declined status
				children.push(
					<div key="status" className="reply__status">
						Declined
					</div>
				);
			} else if (isPostAuthor) {
				// Show accept/decline buttons
				children.push(
					<div key="controls" className="reply__controls">
						<div className="reply__button-wrapper">
							{acceptButton}
						</div>
						<div className="reply__button-wrapper">
							{declineButton}
						</div>
					</div>
				);
			}

			return (
				<div key={reply._id} className="replies__reply reply--request">
					{children}
				</div>
			);

		// Accepting a request to play
		case 'accept':
			return (
				<div key={reply._id} className="replies__reply reply--request">
					<div className="reply__text">
						<span className="reply__author">{reply.author}</span>&nbsp;
						has accepted your request.
					</div>
				</div>
			);

		// Declining a request to play
		case 'decline':
			return (
				<div key={reply._id} className="replies__reply reply--request">
					<div className="reply__text">
						<span className="reply__author">{reply.author}</span>&nbsp;
						has declined your request.
					</div>
				</div>
			);

		// Regular text message
		default:
			return (
				<div key={reply._id} className="replies__reply">
					<div className="reply__text">
						<span className="reply__author">{reply.author}:</span>&nbsp;
						{reply.body.message}
					</div>
				</div>
			);
	}
};

Reply.propTypes = {
	reply: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	currentUser: PropTypes.object,
	onAccept: PropTypes.func,
	onDecline: PropTypes.func
};

export default Reply;
