import { fetchPosts } from "./PostActions";

export const REQUEST_ACCEPT_REQUEST = 'REQUEST_ACCEPT_REQUEST';
function requestAcceptRequest(request, post) {
	return {
		type: REQUEST_ACCEPT_REQUEST,
		request,
		post
	}
}

export const REQUEST_ACCEPT_SUCCESS = 'REQUEST_ACCEPT_SUCCESS';
function successAcceptRequest(request, post) {
	return {
		type: REQUEST_ACCEPT_SUCCESS,
		request,
		post
	}
}

export const REQUEST_ACCEPT_FAIL = 'REQUEST_ACCEPT_FAIL';
function failAcceptRequest(request, post) {
	return {
		type: REQUEST_ACCEPT_FAIL,
		request,
		post
	}
}

export function acceptRequest(request, post, filters) {
	return async function (dispatch) {
		dispatch(requestAcceptRequest(request, post));

		const reply = {
			author: post.author,
			recipient: request.author,
			type: 'accept',
			body: {}
		};

		const response = await fetch('/api/posts/' + post._id, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reply)
		});

		if (response.ok) {
			dispatch(successAcceptRequest(request, post));
			dispatch(fetchPosts(filters));
		} else {
			dispatch(failAcceptRequest(request, post));
		}
	}
}

export const REQUEST_DECLINE_REQUEST = 'REQUEST_DECLINE_REQUEST';
function requestDeclineRequest(request, post) {
	return {
		type: REQUEST_DECLINE_REQUEST,
		request,
		post
	}
}

export const REQUEST_DECLINE_SUCCESS = 'REQUEST_DECLINE_SUCCESS';
function successDeclineRequest(request, post) {
	return {
		type: REQUEST_DECLINE_SUCCESS,
		request,
		post
	}
}

export const REQUEST_DECLINE_FAIL = 'REQUEST_DECLINE_FAIL';
function failDeclineRequest(request, post) {
	return {
		type: REQUEST_DECLINE_FAIL,
		request,
		post
	}
}

export function declineRequest(request, post, filters) {
	return async function (dispatch) {
		dispatch(requestDeclineRequest(request, post));

		const reply = {
			author: post.author,
			recipient: request.author,
			type: 'decline',
			body: {}
		};

		const response = await fetch('/api/posts/' + post._id, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reply)
		});

		if (response.ok) {
			dispatch(successDeclineRequest(request, post));
			dispatch(fetchPosts(filters));
		} else {
			dispatch(failDeclineRequest(request, post));
		}
	}
}
