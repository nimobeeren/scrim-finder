import { CREATE_REPLY_DRAFT } from "../actions/PostReplyActions";

function activePostReducer(state = null, action) {
	switch (action.type) {
		case CREATE_REPLY_DRAFT:
			return action.post;

		default:
			return state;
	}
}

export default activePostReducer;
