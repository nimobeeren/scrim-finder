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

		this.handleOpenReply = this.handleOpenReply.bind(this);
		this.toggleExpandReplies = this.toggleExpandReplies.bind(this);

		this.state = {
			expanded: false
		};
	}

	handleOpenReply() {
		this.props.openReply(this.props.post);
	}

	toggleExpandReplies() {
		this.setState({
			expanded: !this.state.expanded
		});
	}

	render() {
		const expanded = this.state.expanded,
			replies = this.props.post.replies;
		return (
			<div>
				<div className="lower__controls">
					<Button className="btn" label="GO" onClick={this.handleOpenReply}/>
					<ReplyCount
						expanded={expanded}
						replies={replies}
						onClick={this.toggleExpandReplies}/>
				</div>
				<ReplyList expanded={expanded} replies={replies}/>
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
