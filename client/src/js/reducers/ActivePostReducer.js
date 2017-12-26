import { REPLY_DRAFT_CREATE } from "../actions/PostReplyActions";

function activePostReducer(state = null, action) {
	switch (action.type) {
		case REPLY_DRAFT_CREATE:
			return action.post;

		default:
			return state;
	}
}

export default activePostReducer;
