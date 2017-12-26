export const REGISTER_ANONYMOUS_REQUEST = 'REGISTER_ANONYMOUS_REQUEST';
function requestAnonymousRegister() {
	return {
		type: REGISTER_ANONYMOUS_REQUEST
	};
}

export const ANONYMOUS_REGISTER_SUCCESS = 'ANONYMOUS_REGISTER_SUCCESS';
function successAnonymousRegister(user) {
	return {
		type: ANONYMOUS_REGISTER_SUCCESS,
		user
	};
}

export const ANONYMOUS_REGISTER_FAIL = 'ANONYMOUS_REGISTER_FAIL';
function failAnonymousRegister() {
	return {
		type: ANONYMOUS_REGISTER_FAIL
	};
}

export function anonymousRegister() {
	return async function (dispatch) {
		dispatch(requestAnonymousRegister());

		const response = await fetch('/api/auth/register', {
			method: 'POST'
		});

		if (response.ok) {
			const json = await response.json();
			dispatch(successAnonymousRegister({
				id: json.userId,
				token: json.token
			}));
		} else {
			dispatch(failAnonymousRegister());
		}
	};
}
