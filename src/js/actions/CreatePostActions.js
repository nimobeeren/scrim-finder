export const createPostButtonClick = () => {
	return {
		type: 'POST_DRAFT'
	};
};

export const createPost = (post) => {
	return {
		type: 'POST_CREATE',
		payload: post
	};
};

export const cancelPost = () => {
	return {
		type: 'POST_CANCEL'
	};
};
