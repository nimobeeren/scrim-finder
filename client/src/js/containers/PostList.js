import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchPosts } from "../actions/PostActions";
import Post from '../components/Post';
import '../../styles/containers/PostList.css';

function renderPosts(posts, currentUser, levelNames) {
	if (posts.length > 0) {
		return posts.map(post => {
				const isPostAuthor = (!!currentUser && post.author === currentUser.id);
				return <Post
					key={post._id}
					post={post}
					isPostAuthor={isPostAuthor}
					levelNames={levelNames}/>
			}
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
		const { posts, currentUser, levelNames } = this.props;
		return (
			<div className="post-list">
				{renderPosts(posts, currentUser, levelNames)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts.items,
		currentUser: state.currentUser,
		levelNames: state.levelNames,
		filters: state.filters
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchPosts
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
