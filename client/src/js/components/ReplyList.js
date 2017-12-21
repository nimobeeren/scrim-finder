import React from 'react';
import PropTypes from 'prop-types';
import Button from "./Button";

import '../../styles/components/ReplyList.css';


function renderReplies(replies) {
	// Give feedback when are no replies
	if (replies.length === 0) {
		return <div className="replies__reply"><i>No replies found</i></div>;
	}

	return replies.map(reply => {
		switch (reply.type) {
			case 'request':
				// Request to play a map
				return (
					<div key={reply._id} className="replies__reply reply--request">
						<div className="reply__text">
							<span className="reply__author">{reply.author}</span>&nbsp;
							wants to play <span className="map">{reply.body.map}</span>:&nbsp;
							<i>{reply.body.message}</i>
						</div>
						<div className="reply__controls">
							<div className="reply__button-wrapper">
								<Button className="btn btn--small" label="Accept"/>
							</div>
							<div className="reply__button-wrapper">
								<Button className="btn btn--small" label="Decline"/>
							</div>
						</div>
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
	})
}

const ReplyList = (props) => (
	<div className={"replies" + (props.expanded ? " replies--expanded" : "")}>
		{renderReplies(props.replies)}
	</div>
);

ReplyList.propTypes = {
	expanded: PropTypes.bool,
	replies: PropTypes.array
};

export default ReplyList;
