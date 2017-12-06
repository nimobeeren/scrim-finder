const popupTypeReducer = (state = null, action) => {
	switch (action.type) {
		case 'OPEN_POST_REPLY':
			// Pass on the popup type from the action
			return "POST_REPLY";

		case 'POST_REPLY':
			// Close popup after sending reply
			return null;

		case 'CLOSE_POPUP':
			// No popup is open
			return null;

		default:
			// Leave popup type the same
			return state;
	}
};

export default popupTypeReducer;
