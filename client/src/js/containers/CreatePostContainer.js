import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createPostDraft } from "../actions/CreatePostActions";
import CreatePostCard from "../components/CreatePostCard";
import CreatePostButton from "../components/CreatePostButton";

const CreatePostContainer = ({ drafting, createPostDraft }) => {
  if (drafting) {
    return <CreatePostCard />;
  } else {
    return <CreatePostButton onClick={createPostDraft} />;
  }
};

function mapStateToProps(state) {
  return {
    drafting: state.draftingPost
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createPostDraft
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePostContainer);
