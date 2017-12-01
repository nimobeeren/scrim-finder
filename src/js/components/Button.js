import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './../../styles/components/Button.css';

class Button extends Component {
	render() {
		return (
			<button className={this.props.className} onClick={this.props.onClick}>
				{this.props.label}
			</button>
		);
	}
}

Button.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func
};
Button.defaultProps = {
	label: "Button"
};

export default Button;
