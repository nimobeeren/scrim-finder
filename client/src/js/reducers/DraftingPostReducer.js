import {
	POST_DRAFT_CREATE,
	POST_DRAFT_CANCEL,
	POST_CREATE_REQUEST
} from '../actions/CreatePostActions';

function draftingPostReducer(state = null, action) {
	switch (action.type) {
		case POST_DRAFT_CREATE:
			return true;

		case POST_DRAFT_CANCEL:
			return false;

		case POST_CREATE_REQUEST:
			return false;

		default:
			return state || false;
	}
}

export default draftingPostReducer;
