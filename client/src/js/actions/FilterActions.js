import { fetchPosts } from './PostActions';


export const FILTER_CHANGE = 'FILTER_CHANGE';
function changeFilter(filters) {
	return {
		type: FILTER_CHANGE,
		filters
	};
}

export function changeFilterAndFetch(filters) {
	return function (dispatch) {
		dispatch(changeFilter(filters));
		dispatch(fetchPosts(filters));
	}
}
