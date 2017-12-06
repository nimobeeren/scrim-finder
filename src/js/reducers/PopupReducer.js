const popupType = (state = null, action) => {
	switch(action.type) {
		case 'OPEN_POPUP':
			// Set popupType to the one passed through the action
			return action.payload;

		case 'CLOSE_POPUP':
			// Set popupType to null
			return null;

		default:
			// Leave popupType the same
			return state;
	}
};

export default popupType;
