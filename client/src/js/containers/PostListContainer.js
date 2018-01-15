import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchPosts } from "../actions/PostActions";
import PostList from "../components/PostList";

class PostListContainer extends Component {
	constructor(props) {
		super(props);

		// Refresh post list on fixed interval
		setInterval(() => this.props.fetchPosts(this.props.filters), 5000); // FIXME PLEASE
	}

	render() {
		const { posts, levelNames } = this.props;
		return <PostList
			posts={posts}
			levelNames={levelNames}/>;
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts.items,
		levelNames: state.levelNames,
		filters: state.filters
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchPosts
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
