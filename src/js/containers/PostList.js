import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import '../../styles/components/PostList.css';

import Post from '../components/Post';

class PostList extends Component {
	render() {
		return (
			<div className="post-list">
				{
					this.props.posts.map((post, i) =>
						<Post
							key={'post' + i}
							teamName={post.teamName}
							level={post.level}
							maps={post.maps}
							server={post.server}/>
					)
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts
	};
}

PostList.propTypes = {
	posts: PropTypes.array
};
PostList.defaultProps = {
	posts: []
};

export default connect(mapStateToProps)(PostList);
