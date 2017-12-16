import { CHANGE_FILTER } from "../actions/FilterActions";

function filtersReducer(state = null, action) {
	switch (action.type) {
		case CHANGE_FILTER:
			return action.filters;

		default:
			return state;
	}
}

export default filtersReducer;
