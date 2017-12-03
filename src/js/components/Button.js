import React from 'react';
import PropTypes from 'prop-types';

import './../../styles/components/Button.css';

const Button = (props) => (
	<button className={props.className} onClick={props.onClick}>
		{props.label}
	</button>
);

Button.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func
};
Button.defaultProps = {
	label: "Button"
};

export default Button;
