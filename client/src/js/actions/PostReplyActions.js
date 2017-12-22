import { fetchPosts } from "./PostActions";

export const CREATE_REPLY_DRAFT = 'CREATE_REPLY_DRAFT';
export function openReply(post) {
	return {
		type: CREATE_REPLY_DRAFT,
		post
	};
}

export const CANCEL_REPLY_DRAFT = 'CANCEL_REPLY_DRAFT';
export function cancelReply() {
	return {
		type: CANCEL_REPLY_DRAFT
	};
}

export const REQUEST_SEND_REPLY = 'REQUEST_SEND_REPLY';
function requestSendReply(postId, reply) {
	return {
		type: REQUEST_SEND_REPLY,
		postId,
		reply
	}
}

export const SUCCES_SEND_REPLY = 'SUCCES_SEND_REPLY';
function succesSendReply(postId, reply, response) {
	return {
		type: SUCCES_SEND_REPLY,
		postId,
		reply,
		response
	}
}

export const FAIL_SEND_REPLY = 'FAIL_SEND_REPLY';
function failSendReply(postId, reply, response) {
	return {
		type: FAIL_SEND_REPLY,
		postId,
		reply,
		response
	}
}

export function sendReply(postId, reply, filters) {
	return async function(dispatch) {
		dispatch(requestSendReply(postId, reply));

		const response = await fetch('/api/posts/' + postId, {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(reply)
		});

		if (response.ok) {
			dispatch(succesSendReply(postId, reply, response));
			dispatch(fetchPosts(filters));
		} else {
			// TODO: Handle failure
			dispatch(failSendReply(postId, reply, response));
		}
	}
}
