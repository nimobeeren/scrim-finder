export const openPostReply = (post) => {
	return {
		type: 'REPLY_DRAFT',
		payload: post
	};
};

export const cancelPostReply = () => {
	return {
		type: 'REPLY_CANCEL'
	};
};

export const sendPostReply = (reply) => {
	return {
		type: 'REPLY_SEND',
		payload: reply
	};
};
