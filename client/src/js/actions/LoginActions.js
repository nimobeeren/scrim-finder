import { anonymousRegister } from "./RegisterActions";

export const REQUEST_ANONYMOUS_LOGIN = 'REQUEST_ANONYMOUS_LOGIN';
function requestAnonymousLogin(user) {
	return {
		type: REQUEST_ANONYMOUS_LOGIN,
		user
	};
}

export const SUCCESS_ANONYMOUS_LOGIN = 'SUCCESS_ANONYMOUS_LOGIN';
function successAnonymousLogin(user) {
	return {
		type: SUCCESS_ANONYMOUS_LOGIN,
		user
	};
}

export const FAIL_ANONYMOUS_LOGIN = 'FAIL_ANONYMOUS_LOGIN';
function failAnonymousLogin(user) {
	return {
		type: FAIL_ANONYMOUS_LOGIN,
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
