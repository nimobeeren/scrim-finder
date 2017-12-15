import React, {Component} from 'react';
import {createPostDraft} from "../actions/CreatePostActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Button from '../components/Button';
import '../../styles/containers/Aside.css';


class Aside extends Component {
	render() {
		return (
			<aside>
				<div className="create-post">
					<Button className="btn btn--large" label="Create post" onClick={this.props.handleClick}/>
				</div>
			</aside>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		handleClick: createPostDraft
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(Aside);
