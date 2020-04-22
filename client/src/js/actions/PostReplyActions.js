import { fetchPosts } from "./PostActions";

export const REPLY_DRAFT_CREATE = "REPLY_DRAFT_CREATE";
export function createReplyDraft(post) {
  return {
    type: REPLY_DRAFT_CREATE,
    post
  };
}

export const REPLY_DRAFT_CANCEL = "REPLY_DRAFT_CANCEL";
export function cancelReplyDraft() {
  return {
    type: REPLY_DRAFT_CANCEL
  };
}

export const REPLY_SEND_REQUEST = "REPLY_SEND_REQUEST";
function requestSendReply(postId, reply, user) {
  return {
    type: REPLY_SEND_REQUEST,
    postId,
    reply,
    user
  };
}

export const REPLY_SEND_SUCCESS = "REPLY_SEND_SUCCESS";
function successSendReply(postId, reply, user, response) {
  return {
    type: REPLY_SEND_SUCCESS,
    postId,
    reply,
    user,
    response
  };
}

export const REPLY_SEND_FAIL = "REPLY_SEND_FAIL";
function failSendReply(postId, reply, user, response) {
  return {
    type: REPLY_SEND_FAIL,
    postId,
    reply,
    user,
    response
  };
}

export function sendReply(postId, reply, user, filters) {
  return async function(dispatch) {
    dispatch(requestSendReply(postId, reply, user));

    const response = await fetch("/api/posts/" + postId, {
      method: "POST",
      headers: {
        Authorization: user.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reply)
    });

    if (response.ok) {
      dispatch(successSendReply(postId, reply, user, response));
      dispatch(fetchPosts(filters));
    } else {
      // TODO: Handle failure
      dispatch(failSendReply(postId, reply, user, response));
    }
  };
}
