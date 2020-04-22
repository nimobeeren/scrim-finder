import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReplyCount from "../components/ReplyCount";

function getRealReplyCount(replies, currentUser) {
  return replies.reduce((count, reply) => {
    // TODO: Don't send this reply to the client at all
    if (!reply.recipient || reply.recipient === currentUser.id) {
      return count + 1;
    }
    return count;
  }, 0);
}

const ReplyCountContainer = ({ replies, expanded, onClick, currentUser }) => {
  const count = getRealReplyCount(replies, currentUser);
  return <ReplyCount count={count} expanded={expanded} onClick={onClick} />;
};

ReplyCountContainer.propTypes = {
  replies: PropTypes.array,
  expanded: PropTypes.bool,
  onClick: PropTypes.func
};
ReplyCountContainer.defaultProps = {
  replies: [],
  expanded: false
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(ReplyCountContainer);
