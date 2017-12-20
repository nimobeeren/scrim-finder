// const filterPosts = (posts, filters) => {
// 	if (!filters) {
// 		return posts;
// 	}
//
// 	const {level, maps, server, maxAge} = filters;
// 	return posts.filter(post => {
// 		// Check if post level matches filter
// 		if (level.length > 0 && !level.includes(post.level)) {
// 			return false;
// 		}
//
// 		// Check if post maps include filter
// 		if (post.maps && maps.length > 0 && !post.maps.some(map => maps.includes(map))) {
// 			return false;
// 		}
//
// 		// Check if server matches filter
// 		if (!(typeof server === 'undefined' || typeof post.server === 'undefined'
// 				|| server === 'any' || post.server === 'any'
// 				|| post.server === server)) {
// 			return false;
// 		}
//
// 		// Check if post age matches filter
// 		const now = Date.now();
// 		if (maxAge && now - post.created > maxAge) {
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
			const sortedPosts = action.posts.sort((a, b) =>
				new Date(b.createdAt) - new Date(a.createdAt)
			);
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
