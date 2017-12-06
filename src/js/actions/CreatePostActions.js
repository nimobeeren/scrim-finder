export const createPostButtonClick = () => {
	return {
		type: 'DRAFT_POST'
	};
};

export const createPost = (post) => {
	return {
		type: 'CREATE_POST',
		payload: post
	};
};

export const cancelPost = () => {
	return {
		type: 'CANCEL_POST'
	};
};
