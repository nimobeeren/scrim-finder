import {
	REQUEST_ACCEPT_FAIL, REQUEST_DECLINE_FAIL,
	REQUEST_ACCEPT_REQUEST, REQUEST_DECLINE_REQUEST, REQUEST_ACCEPT_SUCCESS,
	REQUEST_DECLINE_SUCCESS
} from "../actions/PostRequestActions";


function pendingReplyPosts(state = [], action) {
	switch (action.type) {
		case REQUEST_ACCEPT_REQUEST:
		case REQUEST_DECLINE_REQUEST:
			// Add post to the list
			return state.concat(action.post._id);

		case REQUEST_ACCEPT_SUCCESS:
		case REQUEST_DECLINE_SUCCESS:
		case REQUEST_ACCEPT_FAIL:
		case REQUEST_DECLINE_FAIL:
			// Remove post from the list
			const i = state.indexOf(action.post._id);
			if (i > -1) {
				state.splice(i, 1);
			}
			return [].concat(state);

		default:
			return state;
	}
}

export default pendingReplyPosts;
