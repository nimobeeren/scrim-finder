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

		// Create accept REPLY
		const acceptReply = {
			author: post.author,
			recipient: request.author,
			type: 'accept',
			body: {
				ip: post.body.ip,
				password: post.body.password
			}
		};
		const createResponse = await fetch('/api/posts/' + post._id, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(acceptReply)
		});

		// Set status of request to accepted
		const acceptedReply = Object.assign({}, request, {
			status: 'accepted'
		});
		const editReponse = await fetch('/api/replies/' + request._id, {
			method: 'PUT',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(acceptedReply)
		});

		if (createResponse.ok && editReponse.ok) {
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

		const declineReply = {
			author: post.author,
			recipient: request.author,
			type: 'decline',
			body: {}
		};
		const createResponse = await fetch('/api/posts/' + post._id, {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(declineReply)
		});

		// Set status of request to accepted
		const declined = Object.assign({}, request, {
			status: 'declined'
		});
		const editReponse = await fetch('/api/replies/' + request._id, {
			method: 'PUT',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(declined)
		});

		if (createResponse.ok && editReponse.ok) {
			dispatch(successDeclineRequest(request, post));
			dispatch(fetchPosts(filters));
		} else {
			dispatch(failDeclineRequest(request, post));
		}
	}
}
