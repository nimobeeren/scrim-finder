import {fetchPosts} from "./PostActions";

export function createPostDraft() {
	return {
		type: 'CREATE_POST_DRAFT'
	};
}

export function cancelPostDraft() {
	return {
		type: 'CANCEL_POST_DRAFT'
	};
}

export function requestCreatePost(post) {
	return {
		type: 'REQUEST_CREATE_POST',
		post
	};
}

export function successCreatePost(post, filters, response) {
	return {
		type: 'SUCCESS_CREATE_POST',
		post,
		filters,
		response
	};
}

export function failCreatePost(post, response) {
	return {
		type: 'FAIL_CREATE_POST',
		post,
		response
	}
}

export function createPost(post, filters) {
	return async function(dispatch) {
		dispatch(requestCreatePost(post));
		const response = await fetch('/api/posts', {
			method: 'PUT',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(post)
		});

		if (response.ok) {
			dispatch(successCreatePost(post, response, filters));
			dispatch(fetchPosts(filters)); // update post list after creating new post
		} else {
			dispatch(failCreatePost(post, response));
		}
	}
}
