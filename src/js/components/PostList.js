import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

import './../../styles/components/PostList.css';

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

PostList.propTypes = {
	posts: PropTypes.array
};
PostList.defaultProps = {
	posts: []
};

export default PostList;
