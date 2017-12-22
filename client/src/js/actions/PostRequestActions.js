import { fetchPosts } from "./PostActions";

export const REQUEST_ACCEPT_REQUEST = 'REQUEST_ACCEPT_REQUEST';
function requestAcceptRequest(request, post) {
	return {
		type: REQUEST_ACCEPT_REQUEST,
		request,
		post
	}
}

export const SUCCESS_ACCEPT_REQUEST = 'SUCCESS_ACCEPT_REQUEST';
function successAcceptRequest(request, post) {
	return {
		type: SUCCESS_ACCEPT_REQUEST,
		request,
		post
	}
}

export const FAIL_ACCEPT_REQUEST = 'FAIL_ACCEPT_REQUEST';
function failAcceptRequest(request, post) {
	return {
		type: FAIL_ACCEPT_REQUEST,
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

export const SUCCESS_DECLINE_REQUEST = 'SUCCESS_DECLINE_REQUEST';
function successDeclineRequest(request, post) {
	return {
		type: SUCCESS_DECLINE_REQUEST,
		request,
		post
	}
}

export const FAIL_DECLINE_REQUEST = 'FAIL_DECLINE_REQUEST';
function failDeclineRequest(request, post) {
	return {
		type: FAIL_DECLINE_REQUEST,
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
