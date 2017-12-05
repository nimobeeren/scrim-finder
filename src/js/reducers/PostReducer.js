const allPosts = [
	{
		teamName: "Nehox",
		level: "Top",
		maps: ["cache", "overpass", "nuke", "cbble", "mirage", "train"],
		server: true,
		created: 1512468376986
	},
	{
		teamName: "Team Adrian",
		level: "High",
		created: 1512467076986
	},
	{
		teamName: "MouseMafia",
		level: "Medium",
		maps: ["cache", "overpass", "cbble", "mirage"],
		server: false,
		created: 1512382348943
	}
];

const postReducer = (state = null, action) => {
	switch (action.type) {
		case 'FILTER_CHANGED':
			const {allowedLevels, allowedMaps, allowedServer, maxAllowedAge} = action.payload;
			return allPosts.filter(post => {
				// Check if post level matches filter
				if (allowedLevels.length > 0 && !allowedLevels.includes(post.level)) {
					return false;
				}

				// Check if post maps include filter
				if (post.maps && allowedMaps.length > 0 && !post.maps.some(map => allowedMaps.includes(map))) {
					return false;
				}

				// Check if server matches filter
				if (!(typeof post.server === 'undefined'
						|| typeof allowedServer === 'undefined'
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
		default:
			return allPosts;
	}
};

export default postReducer;
