import {
	FAIL_ACCEPT_REQUEST, FAIL_DECLINE_REQUEST,
	REQUEST_ACCEPT_REQUEST, REQUEST_DECLINE_REQUEST, SUCCESS_ACCEPT_REQUEST,
	SUCCESS_DECLINE_REQUEST
} from "../actions/PostRequestActions";


function pendingReplyPosts(state = [], action) {
	switch (action.type) {
		case REQUEST_ACCEPT_REQUEST:
		case REQUEST_DECLINE_REQUEST:
			// Add post to the list
			return state.concat(action.post._id);

		case SUCCESS_ACCEPT_REQUEST:
		case SUCCESS_DECLINE_REQUEST:
		case FAIL_ACCEPT_REQUEST:
		case FAIL_DECLINE_REQUEST:
			// Remove post from the list
			const i = state.indexOf(action.post._id);
			if (i > -1) {
				state.splice(i, 1);
				console.log(state);
			}
			return [].concat(state);

		default:
			return state;
	}
}

export default pendingReplyPosts;
