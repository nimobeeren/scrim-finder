import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from "./Button";
import '../../styles/components/ReplyList.css';


class ReplyList extends Component {
	renderReplies() {
		const replies = this.props.replies;

		// Give feedback when are no replies
		if (!replies || replies.length === 0) {
			return <div className="replies__reply"><i>No replies found</i></div>;
		}

		return replies.map(reply => {
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

					if (this.props.isAuthor) {
						children.push(
							<div key="controls" className="reply__controls">
								<div className="reply__button-wrapper">
									<Button className="btn btn--small" label="Accept"/>
								</div>
								<div className="reply__button-wrapper">
									<Button className="btn btn--small" label="Decline"/>
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
		})
	}

	render() {
		return (
			<div className={"replies" + (this.props.expanded ? " replies--expanded" : "")}>
				{this.renderReplies()}
			</div>
		);
	}
}

ReplyList.propTypes = {
	expanded: PropTypes.bool,
	isAuthor: PropTypes.bool,
	replies: PropTypes.array
};

export default ReplyList;
