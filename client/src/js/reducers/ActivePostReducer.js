const activePostReducer = (state = null, action) => {
	switch (action.type) {
		case 'REPLY_DRAFT':
			return action.payload;

		default:
			return state;
	}
};

export default activePostReducer;
