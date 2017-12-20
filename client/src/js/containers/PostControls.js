import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { openReply } from "../actions/PostReplyActions";
import Button from '../components/Button';
import '../../styles/components/PostActionControls.css';


class PostControls extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.openPostReply(this.props.post);
	}

	render() {
		return (
			<div>
				<Button className="btn" label="GO" onClick={this.handleClick}/>
				<div className="post-actions__feedback">Request sent</div>
			</div>
		);
	}
}

PostControls.propTypes = {
	post: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openPostReply: openReply
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(PostControls);
