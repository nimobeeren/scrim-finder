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

export function acceptRequest(request, post) {
	return async function (dispatch) {
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
			dispatch(successAcceptRequest(request));
		} else {
			dispatch(failAcceptRequest(request));
		}
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

export function declineRequest(request, post) {
	return async function (dispatch) {
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
			dispatch(successDeclineRequest(request));
		} else {
			dispatch(failDeclineRequest(request));
		}
	}
}
