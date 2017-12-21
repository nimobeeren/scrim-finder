import React from 'react'
import PropTypes from 'prop-types';

import '../../styles/components/ReplyCount.css';


const ReplyCount = (props) => (
	<div className="reply-count">
		<div className="reply-count__label">2 replies</div>
		<div className="reply-count__chevron"/>
	</div>
);

ReplyCount.propTypes = {
	replies: PropTypes.array
};

export default ReplyCount;
