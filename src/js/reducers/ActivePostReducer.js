const getActivePost = (state = null, action) => {
	switch (action.type) {
		case 'OPEN_POST_REPLY':
			return action.payload;

		default:
			return state;
	}
};

export default getActivePost;
