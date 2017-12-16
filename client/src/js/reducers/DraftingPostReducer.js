import {
	CREATE_POST_DRAFT,
	CANCEL_POST_DRAFT,
	REQUEST_CREATE_POST
} from '../actions/CreatePostActions';

function draftingPostReducer(state = null, action) {
	switch (action.type) {
		case CREATE_POST_DRAFT:
			return true;

		case CANCEL_POST_DRAFT:
			return false;

		case REQUEST_CREATE_POST:
			return false;

		default:
			return state || false;
	}
};

export default draftingPostReducer;
