import React, {Component} from 'react';
import {connect} from 'react-redux';

import Post from '../components/Post';
import '../../styles/components/PostList.css';


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
							server={post.server}
							created={post.created}/>
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

export default connect(mapStateToProps)(PostList);
