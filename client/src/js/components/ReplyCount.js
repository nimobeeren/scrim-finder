import React from 'react'
import PropTypes from 'prop-types';
import '../../styles/components/ReplyCount.css';

const ReplyCount = (props) => {
	return (
		<div className="reply-count" onClick={props.onClick}>
			<div className="reply-count__label">
				{props.count} repl{props.count === 1 ? 'y' : 'ies'}
			</div>
			<div className={"reply-count__chevron" + (props.expanded ? " chevron--expanded" : "")}/>
		</div>
	);
};

ReplyCount.propTypes = {
	count: PropTypes.number,
	expanded: PropTypes.bool,
	onClick: PropTypes.func
};
ReplyCount.defaultProps = {
	count: 0,
	expanded: false
};

export default ReplyCount;
