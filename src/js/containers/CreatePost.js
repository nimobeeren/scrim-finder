import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {createPostButtonClick} from "../actions/CreatePostActions";
import Button from '../components/Button';
import '../../styles/containers/CreatePost.css';


const CreatePost = (props) => {
	return (
		<div className="create-post-btn-wrapper">
			<Button className="btn--large" label="Create post" onClick={props.handleClick}/>
		</div>
	)
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		handleClick: createPostButtonClick
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(CreatePost);
