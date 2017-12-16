export const CREATE_REPLY_DRAFT = 'CREATE_REPLY_DRAFT';
export function openPostReply(post) {
	return {
		type: CREATE_REPLY_DRAFT,
		post
	};
}

export const CANCEL_REPLY_DRAFT = 'CANCEL_REPLY_DRAFT';
export function cancelPostReply() {
	return {
		type: CANCEL_REPLY_DRAFT
	};
}

export const SEND_REPLY = 'SEND_REPLY';
export function sendPostReply(reply) {
	return {
		type: SEND_REPLY,
		payload: reply
	};
}
