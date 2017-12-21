import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { openReply } from "../actions/PostReplyActions";
import Button from '../components/Button';
import ReplyCount from '../components/ReplyCount';
import ReplyList from '../components/ReplyList';
import '../../styles/containers/PostLower.css';


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
				<div className="lower__controls">
					<Button className="btn" label="GO" onClick={this.handleClick}/>
					<ReplyCount replies={this.props.post.replies}/>
				</div>
				<ReplyList replies={this.props.post.replies}/>
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
