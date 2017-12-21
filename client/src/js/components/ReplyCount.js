import React from 'react'
import PropTypes from 'prop-types';

import '../../styles/components/ReplyCount.css';


const ReplyCount = (props) => (
	<div className="reply-count">
		<div className="reply-count__label">
			{props.replies.length} repl{props.replies.length === 1 ? 'y' : 'ies'}
		</div>
		<div className={"reply-count__chevron" + (props.expanded ? " chevron--expanded" : "")}/>
	</div>
);

ReplyCount.propTypes = {
	expanded: PropTypes.bool,
	replies: PropTypes.array
};

export default ReplyCount;
