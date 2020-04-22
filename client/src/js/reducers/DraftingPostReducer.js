import {
  POST_CREATE_REQUEST,
  POST_DRAFT_CANCEL,
  POST_DRAFT_CREATE
} from "../actions/CreatePostActions";

function draftingPostReducer(state = false, action) {
  switch (action.type) {
    case POST_DRAFT_CREATE:
      return true;

    case POST_DRAFT_CANCEL:
      return false;

    case POST_CREATE_REQUEST:
      return false;

    default:
      return state;
  }
}

export default draftingPostReducer;
