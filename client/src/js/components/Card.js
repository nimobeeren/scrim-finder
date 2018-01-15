import React from 'react';
import PropTypes from 'prop-types';
import './../../styles/Card.css';

const Card = ({ className, title, subtitle, children }) => (
	<div className={className}>
		{title && <h3>{title}</h3>}
		{subtitle && <div className="card__subtitle">{subtitle}</div>}
		{children}
	</div>
);

Card.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string
};

export default Card;
