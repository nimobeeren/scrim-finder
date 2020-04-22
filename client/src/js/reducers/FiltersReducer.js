import { FILTER_CHANGE } from "../actions/FilterActions";

function filtersReducer(state = null, action) {
  switch (action.type) {
    case FILTER_CHANGE:
      return action.filters;

    default:
      return state;
  }
}

export default filtersReducer;
