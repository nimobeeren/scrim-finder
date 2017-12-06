const popupTypeReducer = (state = null, action) => {
	switch (action.type) {
		case 'REPLY_DRAFT':
			// Pass on the popup type from the action
			return "REPLY_SEND";

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
