import { fetchPosts } from "./PostActions";

export const POST_DRAFT_CREATE = 'POST_DRAFT_CREATE';
export function createPostDraft() {
	return {
		type: POST_DRAFT_CREATE
	};
}

export const POST_DRAFT_CANCEL = 'POST_DRAFT_CANCEL';
export function cancelPostDraft() {
	return {
		type: POST_DRAFT_CANCEL
	};
}

export const POST_CREATE_REQUEST = 'POST_CREATE_REQUEST';
function requestCreatePost(post) {
	return {
		type: POST_CREATE_REQUEST,
		post
	};
}

export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS';
function successCreatePost(post, filters, response) {
	return {
		type: POST_CREATE_SUCCESS,
		post,
		filters,
		response
	};
}

export const POST_CREATE_FAIL = 'POST_CREATE_FAIL';
function failCreatePost(post, response) {
	return {
		type: POST_CREATE_FAIL,
		post,
		response
	}
}

export function createPost(post, filters) {
	return async function (dispatch) {
		dispatch(requestCreatePost(post));
		const response = await fetch('/api/posts', {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(post)
		});

		if (response.ok) {
			dispatch(successCreatePost(post, response, filters));
			dispatch(fetchPosts(filters)); // update post list after creating new post
		} else {
			// TODO: Handle failure
			dispatch(failCreatePost(post, response));
		}
	}
}
