import { fetchPosts } from "./PostActions";

export const POST_DRAFT_CREATE = "POST_DRAFT_CREATE";
export function createPostDraft() {
  return {
    type: POST_DRAFT_CREATE
  };
}

export const POST_DRAFT_CANCEL = "POST_DRAFT_CANCEL";
export function cancelPostDraft() {
  return {
    type: POST_DRAFT_CANCEL
  };
}

export const POST_CREATE_REQUEST = "POST_CREATE_REQUEST";
function requestCreatePost(post, user) {
  return {
    type: POST_CREATE_REQUEST,
    post,
    user
  };
}

export const POST_CREATE_SUCCESS = "POST_CREATE_SUCCESS";
function successCreatePost(post, filters, user, response) {
  return {
    type: POST_CREATE_SUCCESS,
    post,
    filters,
    user,
    response
  };
}

export const POST_CREATE_FAIL = "POST_CREATE_FAIL";
function failCreatePost(post, user, response) {
  return {
    type: POST_CREATE_FAIL,
    post,
    user,
    response
  };
}

export function createPost(post, filters, user) {
  return async function(dispatch) {
    dispatch(requestCreatePost(post, user));
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        Authorization: user.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    });

    if (response.ok) {
      dispatch(successCreatePost(post, filters, user, response));
      dispatch(fetchPosts(filters)); // update post list after creating new post
    } else {
      // TODO: Handle failure
      dispatch(failCreatePost(post, user, response));
    }
  };
}
