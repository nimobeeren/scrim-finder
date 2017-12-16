import { fetchPosts } from './PostActions';


export const CHANGE_FILTER = 'CHANGE_FILTER';
function changeFilter(filters) {
	return {
		type: CHANGE_FILTER,
		filters
	};
}

export function changeFilterAndFetch(filters) {
	return function (dispatch) {
		dispatch(changeFilter(filters));
		dispatch(fetchPosts(filters));
	}
}
