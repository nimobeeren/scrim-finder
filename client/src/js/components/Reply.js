import React from 'react';
import PropTypes from 'prop-types';
import Button from "./Button";
import '../../styles/Reply.css';

const Reply = (props) => {
	const { reply, status, isPostAuthor, onAccept, onDecline } = props;

	switch (reply.type) {
		// Request to play a map
		case 'request':
			const accepted = (status === 'ACCEPTED');
			const declined = (status === 'DECLINED');

			// Create section containing reply text
			let children = [(
				<div key="text" className={"reply__text" + (declined ? " reply--declined" : "")}>
					<span className="reply__author">Anonymous</span>&nbsp;
					wants to play <span className="map">{reply.body.map}</span>
					{reply.body.message ? ": " : ""}
					<i>{reply.body.message}</i>
				</div>
			)];

			const acceptButton = (
				<Button
					className="btn btn--small"
					label="Accept"
					onClick={onAccept}/>
			);
			const declineButton = (
				<Button
					className="btn btn--small"
					label="Decline"
					onClick={onDecline}/>
			);

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
			const { ip, password } = reply.body || {};
			const connectCommand = `connect ${ip}${password ? `;password ${password}` : ""}`;
			return (
				<div key={reply._id} className="replies__reply reply--request">
					<div className="reply__text">
						<span className="reply__author">Anonymous</span>&nbsp;
						has accepted your request.
						{ip &&
						<div className="reply__server-details">
							Join at: <pre>{connectCommand}</pre>
						</div>
						}
					</div>
				</div>
			);

		// Declining a request to play
		case 'decline':
			return (
				<div key={reply._id} className="replies__reply reply--request">
					<div className="reply__text">
						<span className="reply__author">Anonymous</span>&nbsp;
						has declined your request.
					</div>
				</div>
			);

		// Regular text message
		default:
			return (
				<div key={reply._id} className="replies__reply">
					<div className="reply__text">
						<span className="reply__author">Anonymous:</span>&nbsp;
						{reply.body.message}
					</div>
				</div>
			);
	}
};

Reply.propTypes = {
	reply: PropTypes.object.isRequired,
	status: PropTypes.string,
	isPostAuthor: PropTypes.bool,
	onAccept: PropTypes.func,
	onDecline: PropTypes.func
};

export default Reply;
