import { REPLY_DRAFT_CANCEL, REPLY_DRAFT_CREATE, REPLY_SEND_SUCCESS } from "../actions/PostReplyActions";

export const PopupTypes = {
	reply: 'POPUP_REPLY'
};

function popupTypeReducer(state = null, action) {
	switch (action.type) {
		case REPLY_DRAFT_CREATE:
			// Open the post reply popup
			return PopupTypes.reply;

		case REPLY_DRAFT_CANCEL:
			// Close popup when cancelling reply
			return null;

		case REPLY_SEND_SUCCESS:
			// Close popup after sending reply
			return null;

		default:
			// Leave popup type the same
			return state;
	}
}

export default popupTypeReducer;
