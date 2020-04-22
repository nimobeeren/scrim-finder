import React from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import "../../styles/PostList.css";

const PostList = ({ posts, levelNames }) => {
  if (Array.isArray(posts) && posts.length > 0) {
    return (
      <div className="post-list">
        {posts.map(post => {
          return <Post key={post._id} post={post} levelNames={levelNames} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="post-list post-list--empty">
        No matching posts found <br />
        Please adjust your filters
      </div>
    );
  }
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  levelNames: PropTypes.array
};

export default PostList;
