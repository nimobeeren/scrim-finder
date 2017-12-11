import React, {Component} from 'react';
import {connect} from 'react-redux';

import Post from '../components/Post';
import '../../styles/containers/PostList.css';


function renderPosts(posts) {
	if (posts.length > 0) {
		return posts.map((post, i) =>
			<Post
				key={'post' + i}
				teamName={post.teamName}
				level={post.level}
				maps={post.maps}
				server={post.server}
				created={post.created}/>
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
		posts: state.posts
	};
}

export default connect(mapStateToProps)(PostList);
