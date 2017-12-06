const filtersReducer = (state = null, action) => {
	switch(action.type) {
		case 'FILTER_CHANGED':
			return action.payload;

		default:
			if (state && state.filters){
				return state.filters;
			} else {
				return null;
			}
	}
};

export default filtersReducer;
