import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createReplyDraft } from "../actions/PostReplyActions";
import Button from "../components/Button";

const ReplyButton = props => {
  const { post, createReplyDraft } = props;
  return (
    <Button className="btn" label="GO" onClick={() => createReplyDraft(post)} />
  );
};

ReplyButton.propTypes = {
  post: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createReplyDraft: createReplyDraft
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(ReplyButton);
