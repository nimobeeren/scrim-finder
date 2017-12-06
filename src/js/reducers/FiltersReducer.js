const filtersReducer = (state = null, action) => {
	switch(action.type) {
		case 'FILTER_CHANGED':
			return action.payload;

		default:
			return state;
	}
};

export default filtersReducer;
