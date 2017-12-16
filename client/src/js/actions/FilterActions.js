import { fetchPosts } from './PostActions';


function changeFilter(filters) {
	return {
		type: 'CHANGE_FILTER',
		filters
	};
}

export function changeFilterAndFetch(filters) {
	return function(dispatch) {
		dispatch(changeFilter(filters));
		dispatch(fetchPosts(filters));
	}
}
