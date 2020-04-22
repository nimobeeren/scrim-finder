export const POSTS_REQUEST = "POSTS_REQUEST";
function requestPosts(filters) {
  return {
    type: POSTS_REQUEST,
    filters,
  };
}

export const POSTS_RECEIVE = "POSTS_RECEIVE";
function receivePosts(filters, posts) {
  return {
    type: POSTS_RECEIVE,
    filters,
    posts,
    receivedAt: Date.now(),
  };
}

export const POSTS_FAIL = "POSTS_FAIL";
function failPosts(filters) {
  return {
    type: POSTS_FAIL,
    filters,
  };
}

export function fetchPosts(filters = null) {
  return async function (dispatch) {
    dispatch(requestPosts(filters));

    const query = encodeURIComponent(JSON.stringify(filters));
    const response = await fetch("/api/posts?filters=" + query);

    if (response.ok) {
      const json = await response.json();
      dispatch(receivePosts(filters, json));
    } else {
      // TODO: Handle failure
      dispatch(failPosts(filters));
    }
  };
}
