import { anonymousRegister } from "./RegisterActions";

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
function requestAuthenticate(user) {
	return {
		type: AUTHENTICATE_REQUEST,
		user
	};
}

export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
function successAuthenticate(user) {
	return {
		type: AUTHENTICATE_SUCCESS,
		user
	};
}

export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';
function failAuthenticate(user) {
	return {
		type: AUTHENTICATE_FAIL,
		user
	};
}

export function authenticate(user) {
	return async function (dispatch) {
		dispatch(requestAuthenticate(user));

		const response = await fetch('/auth/refresh', {
			method: 'POST',
			headers: {
				"Authorization": "Bearer: " + user.token
			}
		});

		if (response.ok) {
			const json = await response.json();
			dispatch(successAuthenticate({
				id: json.userId,
				steamId: json.steamId,
				token: json.token
			}));
		} else {
			// Authenticate failed, register new anonymous user instead
			dispatch(failAuthenticate(user));
			dispatch(anonymousRegister());
		}
	};
}

export const LOGOUT = "LOGOUT";
export function logOut() {
	return {
		type: LOGOUT
	}
}
