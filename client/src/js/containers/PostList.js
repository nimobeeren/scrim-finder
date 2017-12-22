import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post';
import '../../styles/containers/PostList.css';
import { bindActionCreators } from "redux";
import { fetchPosts } from "../actions/PostActions";


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
	constructor(props) {
		super(props);

		// FIXME PLEASE
		setInterval(() => this.props.fetchPosts(this.props.filters), 5000);
	}

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
		posts: state.posts.items,
		filters: state.filters // FIXME
	};
}

// FIXME
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchPosts
	}, dispatch);
}

export default connect(mapStateToProps , mapDispatchToProps)(PostList);
