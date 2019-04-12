export const POSTS_REQUEST = 'POSTS_REQUEST';
function requestPosts(filters) {
	return {
		type: POSTS_REQUEST,
		filters
	};
}

export const POSTS_RECEIVE = 'POSTS_RECEIVE';
function receivePosts(filters, posts) {
	return {
		type: POSTS_RECEIVE,
		filters,
		posts,
		receivedAt: Date.now()
	};
}

export const POSTS_FAIL = 'POSTS_FAIL';
function failPosts(filters) {
	return {
		type: POSTS_FAIL,
		filters
	};
}

export function fetchPosts(filters = null) {
	return async function (dispatch) {
		dispatch(requestPosts(filters));

		/*
		PLACEHOLDER
		 */

		let posts = [
			{
				_id: 0,
				createdAt: new Date(2019, 3, 12, 13),
                author: "zonic",
                body: {
                    teamName: "Astralis",
                    level: 3,
                    maps: [ "inferno", "nuke" ],
                    server: true,
                    ip: "localhost:1234",
                    password: "pwd"
                },
                replies: []
			},
            {
                _id: 1,
                createdAt: new Date(2019, 3, 12, 12, 30),
                author: "flusha",
                body: {
                    teamName: "Cloud9",
                    level: 3,
                    maps: [ "inferno", "mirage", "overpass" ],
                    server: false,
                    ip: null,
                    password: null
                },
                replies: []
            },
            {
                _id: 2,
                author: "nimster",
                body: {
                    teamName: "AETAS Esports",
                    level: 2,
                    maps: [ "overpass", "nuke", "train" ],
                    server: null,
                    ip: "localhost:1234",
                    password: "pwd"
                },
                replies: []
            }
		];

        posts = posts.filter(post => {
            if (filters) {
                if (filters.level && filters.level.length > 0 && !filters.level.includes(post.body.level)) {
                    return false;
                }
                if (filters.maps && filters.maps.length > 0) {
                    let mapOk = false;
                    filters.maps.forEach(map => {
                        if (post.body.maps.includes(map)) {
                            mapOk = true;
                        }
                    });
                    if (!mapOk) {
                        return false;
                    }
                }
                if (filters.server !== null && post.body.server !== null) {
                    if (filters.server !== post.body.server) {
                        return false;
                    }
                }
            }

            return true;
        });

		dispatch(receivePosts(filters, posts));

		// const query = encodeURIComponent(JSON.stringify(filters));
		// const response = await fetch('/api/posts?filters=' + query);
		//
		// if (response.ok) {
		// 	const json = await response.json();
		// 	dispatch(receivePosts(filters, json));
		// } else {
		// 	// TODO: Handle failure
		// 	dispatch(failPosts(filters));
		// }
	}
}
