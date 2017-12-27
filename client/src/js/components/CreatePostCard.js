import React from 'react';

import Card from "./Card";
import PostFormContainer from "../containers/PostFormContainer";
import '../../styles/components/CreatePostCard.css';


const CreatePost = () => (
	<div className="create-post__wrapper">
		<Card className="card card--secondary" title="Create a post">
			<PostFormContainer/>
		</Card>
	</div>
);

export default CreatePost;
