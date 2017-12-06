import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {createPostButtonClick} from "../actions/CreatePostActions";
import Card from '../components/Card';
import PostForm from './PostForm';
import Button from '../components/Button';
import '../../styles/containers/CreatePost.css';


const CreatePost = (props) => {
	if (props.drafting) {
		return (
			<Card className="card" title="Create a post">
				<PostForm/>
			</Card>
		);
	} else {
		return (
			<div className="create-post-btn__wrapper">
				<Button className="btn btn--large" label="Create post" onClick={props.handleClick}/>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		drafting: state.draftingPost
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		handleClick: createPostButtonClick
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
