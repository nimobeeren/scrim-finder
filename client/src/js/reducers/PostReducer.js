// const filterPosts = (posts, filters) => {
// 	if (!filters) {
// 		return posts;
// 	}
//
// 	const {allowedLevels, allowedMaps, allowedServer, maxAllowedAge} = filters;
// 	return posts.filter(post => {
// 		// Check if post level matches filter
// 		if (allowedLevels.length > 0 && !allowedLevels.includes(post.level)) {
// 			return false;
// 		}
//
// 		// Check if post maps include filter
// 		if (post.maps && allowedMaps.length > 0 && !post.maps.some(map => allowedMaps.includes(map))) {
// 			return false;
// 		}
//
// 		// Check if server matches filter
// 		if (!(typeof allowedServer === 'undefined' || typeof post.server === 'undefined'
// 				|| allowedServer === 'any' || post.server === 'any'
// 				|| post.server === allowedServer)) {
// 			return false;
// 		}
//
// 		// Check if post age matches filter
// 		const now = Date.now();
// 		if (maxAllowedAge && now - post.created > maxAllowedAge) {
// 			return false;
// 		}
//
// 		// Let this one through
// 		return true;
// 	});
// };

function postReducer(state = {
						 isFetching: false,
						 items: []
					 },
					 action) {
	switch (action.type) {
		case 'REQUEST_POSTS':
			return Object.assign({}, state, {
				isFetching: true
			});

		case 'RECEIVE_POSTS':
			const sortedPosts = action.posts.sort((a, b) => b.created - a.created);
			return Object.assign({}, state, {
				isFetching: false,
				filters: action.filters,
				items: sortedPosts,
				lastUpdated: action.receivedAt
			});

		default:
			return state;
	}
}

export default postReducer;
