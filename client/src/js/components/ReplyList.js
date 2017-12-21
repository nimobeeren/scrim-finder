import React from 'react';
import PropTypes from 'prop-types';
import Button from "./Button";

import '../../styles/components/ReplyList.css';


const ReplyList = (props) => (
	<div className="replies">
		<div className="replies__reply reply--request">
			<div className="reply__text">
				<span className="reply__author">Anonymous</span>&nbsp;
				wants to play <span className="map">overpass</span>
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
		<div className="replies__reply">
			<div className="reply__text">
				<span className="reply__author">Anonymous:</span> This is just a simple text message.
				It might get quite long, but hopefully some wrapping will take care of that.
				It seems to be quite alright.
			</div>
		</div>
	</div>
);

ReplyList.propTypes = {
	replies: PropTypes.array
};

export default ReplyList;
