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
	return function(dispatch) {
		dispatch(requestPosts);
		return fetch('/api/posts')
			.then(response => {
				return response.json();
			})
			.then(json => {
				dispatch(receivePosts(filters, json));
			});
	}
}
