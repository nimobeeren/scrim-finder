import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './../../styles/components/Button.css';

class Button extends Component {
	render() {
		return (
			<button className="btn" onClick={this.props.handleClick}>
				{this.props.label}
			</button>
		);
	}
}

Button.propTypes = {
	label: PropTypes.string,
	handleClick: PropTypes.func
};
Button.defaultProps = {
	label: "Button"
};

export default Button;
