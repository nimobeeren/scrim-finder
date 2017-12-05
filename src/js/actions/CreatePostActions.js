export const createPostButtonClick = () => {
	return {
		type: 'CREATE_POST_BUTTON_CLICK'
	};
};

export const createPost = (post) => {
	return {
		type: 'CREATE_POST',
		payload: post
	};
};
