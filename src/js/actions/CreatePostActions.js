export const createPostButtonClick = () => {
	return {
		type: 'OPEN_POPUP',
		payload: 'create-post'
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
		type: 'CLOSE_POPUP'
	};
};
