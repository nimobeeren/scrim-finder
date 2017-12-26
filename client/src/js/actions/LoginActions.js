import { anonymousRegister } from "./RegisterActions";

export const LOGIN_ANONYMOUS_REQUEST = 'LOGIN_ANONYMOUS_REQUEST';
function requestAnonymousLogin(user) {
	return {
		type: LOGIN_ANONYMOUS_REQUEST,
		user
	};
}

export const LOGIN_ANONYMOUS_SUCCESS = 'LOGIN_ANONYMOUS_SUCCESS';
function successAnonymousLogin(user) {
	return {
		type: LOGIN_ANONYMOUS_SUCCESS,
		user
	};
}

export const LOGIN_ANONYMOUS_FAIL = 'LOGIN_ANONYMOUS_FAIL';
function failAnonymousLogin(user) {
	return {
		type: LOGIN_ANONYMOUS_FAIL,
		user
	};
}

export function anonymousLogin(user) {
	return async function (dispatch) {
		dispatch(requestAnonymousLogin(user));

		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				"Authorization": "Bearer: " + user.token,
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			const json = await response.json();
			dispatch(successAnonymousLogin({
				id: json.userId,
				token: json.token
			}));
		} else {
			// Login failed, register new user instead
			dispatch(failAnonymousLogin(user));
			dispatch(anonymousRegister());
		}
	};
}
