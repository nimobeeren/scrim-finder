import React from 'react';
import PropTypes from 'prop-types';
import './../../styles/Card.css';

const Card = (props) => (
	<div className={props.className}>
		<h3>{props.title}</h3>
		<div className="card__subtitle">{props.subtitle}</div>
		{props.children}
	</div>
);

Card.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string
};

export default Card;
