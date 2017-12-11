let allPosts = [
	{
		teamName: "Nehox",
		level: "Top",
		maps: ["cache", "overpass", "nuke", "cbble", "mirage", "train"],
		server: 'on',
		created: 1512661640044
	},
	{
		teamName: "Team Adrian",
		level: "High",
		created: 1512661104665
	},
	{
		teamName: "MouseMafia",
		level: "Medium",
		maps: ["cache", "overpass", "cbble", "mirage"],
		server: 'off',
		created: 1512659878073
	}
];

const filterPosts = (posts, filters) => {
	if (!filters) {
		return posts;
	}

	const {allowedLevels, allowedMaps, allowedServer, maxAllowedAge} = filters;
	return posts.filter(post => {
		// Check if post level matches filter
		if (allowedLevels.length > 0 && !allowedLevels.includes(post.level)) {
			return false;
		}

		// Check if post maps include filter
		if (post.maps && allowedMaps.length > 0 && !post.maps.some(map => allowedMaps.includes(map))) {
			return false;
		}

		// Check if server matches filter
		if (!(typeof allowedServer === 'undefined' || typeof post.server === 'undefined'
				|| allowedServer === 'any' || post.server === 'any'
				|| post.server === allowedServer)) {
			return false;
		}

		// Check if post age matches filter
		const now = Date.now();
		if (maxAllowedAge && now - post.created > maxAllowedAge) {
			return false;
		}

		// Let this one through
		return true;
	});
};

const postReducer = (state = null, action) => {
	switch (action.type) {
		case 'POST_CREATE':
			// Add creation date to new post
			const newPost = action.payload.post;
			newPost.created = Date.now();

			// Add new post to the list and return the list
			allPosts = allPosts.concat([newPost]); // has to be a new object, .push does NOT work
			return filterPosts(allPosts, action.payload.filters)
				.concat([newPost]) // always show the new post in the list
				.sort((a, b) => b.created - a.created);

		case 'FILTER_CHANGED':
			return filterPosts(allPosts, action.payload)
				.sort((a, b) => b.created - a.created);

		default:
			if (state) {
				return state;
			} else {
				return allPosts.sort((a, b) => b.created - a.created);
			}
	}
};

export default postReducer;
