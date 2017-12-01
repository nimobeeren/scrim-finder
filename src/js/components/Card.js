import React, {Component} from 'react';

import './../../styles/components/Card.css';

class Card extends Component {
	render() {
		return (
			<div className={this.props.className}>
				{this.props.children}
			</div>
		);
	}
}

export default Card;
