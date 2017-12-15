export function requestPosts(filters) {
	return {
		type: 'REQUEST_POSTS',
		filters
	}
}

export function receivePosts(filters, posts) {
	return {
		type: 'RECEIVE_POSTS',
		filters,
		posts,
		receivedAt: Date.now()
	}
}

export function fetchPosts(filters = null) {
	return async function(dispatch) {
		dispatch(requestPosts(filters));
		const response = await fetch('/api/posts');
		const json = await response.json();
		dispatch(receivePosts(filters, json));
	}
}
