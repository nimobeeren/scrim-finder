import React from 'react';
import PropTypes from 'prop-types';

import Button from "./Button";


const Reply = (props) => {
	const { reply, post, currentUser, onAccept, onDecline } = props;

	// Check if current user is the author of the post this reply belongs to
	let isPostAuthor = false;
	if (currentUser) {
		isPostAuthor = (currentUser.id === post.author);
	}

	switch (reply.type) {
		case 'request':
			// Request to play a map
			let children = [(
				<div key="text" className="reply__text">
					<span className="reply__author">{reply.author}</span>&nbsp;
					wants to play <span className="map">{reply.body.map}</span>
					{reply.body.message ? ": " : ""}
					<i>{reply.body.message}</i>
				</div>
			)];

			if (isPostAuthor) {
				children.push(
					<div key="controls" className="reply__controls">
						<div className="reply__button-wrapper">
							<Button
								className="btn btn--small"
								label="Accept"
								onClick={() => onAccept(reply, post)}/>
						</div>
						<div className="reply__button-wrapper">
							<Button
								className="btn btn--small"
								label="Decline"
								onClick={() => onDecline(reply, post)}/>
						</div>
					</div>
				);
			}

			return (
				<div key={reply._id} className="replies__reply reply--request">
					{children}
				</div>
			);

		default:
			// Regular text message
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
