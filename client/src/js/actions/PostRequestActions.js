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

export function declineRequest(request) {
	// TODO
}
