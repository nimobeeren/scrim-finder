import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {createPostDraft} from "../actions/CreatePostActions";
import Card from '../components/Card';
import PostForm from './PostForm';
import Button from '../components/Button';
import '../../styles/containers/CreatePost.css';


const CreatePost = (props) => {
	if (props.drafting) {
		return (
			<div className="create-post__wrapper">
				<Card className="card card--secondary" title="Create a post">
					<PostForm/>
				</Card>
			</div>
		);
	} else {
		return (
			<div className="create-post__wrapper wrapper--btn">
				<Button className="btn btn--large" label="Create post" onClick={props.createPostDraft}/>
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
		createPostDraft
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
