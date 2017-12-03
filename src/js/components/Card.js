import React from 'react';

import './../../styles/components/Card.css';

const Card = (props) => (
	<div className={props.className}>
		{props.children}
	</div>
);

export default Card;
