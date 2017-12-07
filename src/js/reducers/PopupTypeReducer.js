const popupTypeReducer = (state = null, action) => {
	switch (action.type) {
		case 'REPLY_DRAFT':
			// Open the post reply popup
			return "POPUP_REPLY";

		case 'REPLY_SEND':
			// Close popup after sending reply
			return null;

		case 'REPLY_CANCEL':
			// Close popup when cancelling reply
			return null;

		default:
			// Leave popup type the same
			return state;
	}
};

export default popupTypeReducer;
