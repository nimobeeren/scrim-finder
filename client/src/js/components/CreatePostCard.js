import React from 'react';

import Card from "./Card";
import PostForm from "../containers/PostForm";
import '../../styles/components/CreatePostCard.css';


const CreatePost = () => (
	<div className="create-post__wrapper">
		<Card className="card card--secondary" title="Create a post">
			<PostForm/>
		</Card>
	</div>
);

export default CreatePost;
