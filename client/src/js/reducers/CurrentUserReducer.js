import { getUrlParameter } from "../../util";
import { AUTHENTICATE_SUCCESS, LOGOUT } from "../actions/AuthenticateActions";
import { ANONYMOUS_REGISTER_SUCCESS } from "../actions/RegisterActions";

function currentUserReducer(state, action) {
	switch (action.type) {
		case AUTHENTICATE_SUCCESS:
		case ANONYMOUS_REGISTER_SUCCESS:
			const { id, steamId, token } = action.user;

			// Store user details in local storage to allow resuming session
			id && localStorage.setItem('userId', id);
			steamId && localStorage.setItem('steamId', steamId);
			token && localStorage.setItem('token', token);

			return {
				id,
				steamId,
				token,
				authenticated: true
			};

		case LOGOUT:
			localStorage.clear();
			window.location.reload(); // reload the page
			return null;

		default:
			if (!state) {
				// Try to get user identifier from URL params if possible, otherwise from localStorage
				let id, steamId, token;
				const identifier = JSON.parse(getUrlParameter('user'));

				// Get user ID
				if (identifier && identifier.userId) {
					id = identifier.userId;
					localStorage.setItem('userId', id);
				} else {
					id = localStorage.getItem('userId');
				}

				// Get Steam ID
				if (identifier && identifier.steamId) {
					steamId = identifier.steamId;
					localStorage.setItem('steamId', steamId);
				} else {
					steamId = localStorage.getItem('steamId');
				}

				// Get access token
				if (identifier && identifier.token) {
					token = identifier.token;
					localStorage.setItem('token', token);
				} else {
					token = localStorage.getItem('token');
				}

				if (id && token) {
					return { id, steamId, token, authenticated: false };
				}
				return null;
			}
			return state;
	}
}

export default currentUserReducer;
