import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { acceptRequest, declineRequest } from "../actions/PostRequestActions";
import ReplyList from "../components/ReplyList";

const ReplyListContainer = ({
  post,
  expanded,
  currentUser,
  filters,
  acceptRequest,
  declineRequest
}) => {
  // Find replies with the current user as recipient, or no recipient at all
  // TODO: Don't send these replies to the client at all
  const myReplies = post.replies.filter(reply => {
    return (
      !reply.recipient || (currentUser && reply.recipient === currentUser.id)
    );
  });

  return (
    <ReplyList
      replies={myReplies}
      isPostAuthor={!!currentUser && post.author._id === currentUser.id}
      expanded={expanded}
      onAccept={reply => acceptRequest(reply, post, currentUser, filters)}
      onDecline={reply => declineRequest(reply, post, currentUser, filters)}
    />
  );
};

ReplyListContainer.propTypes = {
  post: PropTypes.object.isRequired,
  expanded: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    filters: state.filters
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      acceptRequest,
      declineRequest
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplyListContainer);
