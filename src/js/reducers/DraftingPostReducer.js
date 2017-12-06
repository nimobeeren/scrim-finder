const draftingPost = (state = null, action) => {
	switch(action.type) {
		case 'DRAFT_POST':
			return true;

		case 'CANCEL_POST':
			return false;

		case 'CREATE_POST':
			return false;

		default:
			if (state && typeof state.draftingPost === 'boolean') {
				return state.draftingPost;
			} else {
				return false;
			}
	}
};

export default draftingPost;
