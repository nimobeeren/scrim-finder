import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { openReply } from "../actions/PostReplyActions";
import Button from '../components/Button';
import '../../styles/containers/PostControls.css';


class PostControls extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.openReply(this.props.post);
	}

	render() {
		return (
			<div>
				<div className="controls">
					<Button className="btn" label="GO" onClick={this.handleClick}/>
					<div className="controls__reply-count">
						<div className="controls__label">2 replies</div>
						<div className="controls__chevron"/>
					</div>
				</div>
				<div className="controls__replies">
					<div className="controls__reply reply--request">
						<div className="reply__text">
							<span className="reply__author">Anonymous</span>&nbsp;
							wants to play <span className="map">overpass</span>
						</div>
						<div className="reply__controls">
							<div className="reply__button-wrapper">
								<Button className="btn btn--small" label="Accept"/>
							</div>
							<div className="reply__button-wrapper">
								<Button className="btn btn--small" label="Decline"/>
							</div>
						</div>
					</div>
					<div className="controls__reply">
						<div className="reply__text">
							<span className="reply__author">Anonymous:</span> This is just a simple text message.
							It might get quite long, but hopefully some wrapping will take care of that.
							It seems to be quite alright.
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PostControls.propTypes = {
	post: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openReply
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(PostControls);
