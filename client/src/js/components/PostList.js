import React from 'react';
import PropTypes from 'prop-types';
import Post from "./Post";
import '../../styles/PostList.css';

const PostList = ({ posts, currentUser, levelNames }) => {
	if (posts.length > 0) {
		return (
			<div className="post-list">
				{posts.map(post => {
					const isPostAuthor = (!!currentUser && post.author === currentUser.id);
					return <Post
						key={post._id}
						post={post}
						isPostAuthor={isPostAuthor}
						levelNames={levelNames}/>
				})}
			</div>
		);
	} else {
		return (
			<div className="post-list post-list--empty">
				No matching posts found <br/>
				Please adjust your filters
			</div>
		);
	}
};

PostList.propTypes = {
	posts: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
	levelNames: PropTypes.array
};

export default PostList;
