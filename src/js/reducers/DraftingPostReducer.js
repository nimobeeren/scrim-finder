const draftingPost = (state = null, action) => {
	switch(action.type) {
		case 'DRAFT_POST':
			return true;
		case 'CANCEL_POST':
			return false;
		default:
			return state;
	}
};

export default draftingPost;
