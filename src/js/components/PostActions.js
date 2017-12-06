import React from 'react';

import Button from './Button';
import '../../styles/components/PostActions.css';


function handleClick(e) {
	const feedback = e.target.parentNode.querySelector('.post-actions__feedback');
	feedback.style.display = "inline-block";
}

const PostActions = () => (
	<div>
		<Button className="btn" label="GO" onClick={handleClick}/>
		<div className="post-actions__feedback">Request sent</div>
	</div>
);

export default PostActions;
