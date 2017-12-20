import {
	CREATE_REPLY_DRAFT,
	CANCEL_REPLY_DRAFT,
	SUCCES_SEND_REPLY
} from "../actions/PostReplyActions";

export const PopupTypes = {
	reply: 'POPUP_REPLY'
};

function popupTypeReducer(state = null, action) {
	switch (action.type) {
		case CREATE_REPLY_DRAFT:
			// Open the post reply popup
			return PopupTypes.reply;

		case CANCEL_REPLY_DRAFT:
			// Close popup when cancelling reply
			return null;

		case SUCCES_SEND_REPLY:
			// Close popup after sending reply
			return null;

		default:
			// Leave popup type the same
			return state;
	}
}

export default popupTypeReducer;
