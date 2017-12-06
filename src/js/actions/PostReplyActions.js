export const openPostReply = (post) => {
	return {
		type: 'OPEN_POST_REPLY',
		payload: post
	};
};

export const cancelPostReply = () => {
	return {
		type: 'CLOSE_POPUP'
	};
};

export const sendPostReply = (reply) => {
	return {
		type: 'POST_REPLY',
		payload: reply
	};
};
