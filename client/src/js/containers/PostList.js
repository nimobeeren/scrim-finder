import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post';
import '../../styles/containers/PostList.css';


function renderPosts(posts) {
	if (posts.length > 0) {
		return posts.map(post =>
			<Post
				key={post._id}
				post={post}/>
		);
	} else {
		return (
			<div className="post-list__empty">
				No matching posts found <br/>
				Please adjust your filters
			</div>
		)
	}
}

class PostList extends Component {
	render() {
		return (
			<div className="post-list">
				{renderPosts(this.props.posts)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts.items
	};
}

export default connect(mapStateToProps)(PostList);
