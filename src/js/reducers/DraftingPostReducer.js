const draftingPostReducer = (state = null, action) => {
	switch (action.type) {
		case 'POST_DRAFT':
			return true;

		case 'POST_CANCEL':
			return false;

		case 'POST_CREATE':
			return false;

		default:
			if (state && typeof state.draftingPost === 'boolean') {
				return state.draftingPost;
			} else {
				return false;
			}
	}
};

export default draftingPostReducer;
