export const REQUEST_ANONYMOUS_REGISTER = 'REQUEST_ANONYMOUS_REGISTER';
function requestAnonymousRegister() {
	return {
		type: REQUEST_ANONYMOUS_REGISTER
	};
}

export const SUCCESS_ANONYMOUS_REGISTER = 'SUCCESS_ANONYMOUS_REGISTER';
function successAnonymousRegister(user) {
	return {
		type: SUCCESS_ANONYMOUS_REGISTER,
		user
	};
}

export const FAIL_ANONYMOUS_REGISTER = 'FAIL_ANONYMOUS_REGISTER';
function failAnonymousRegister() {
	return {
		type: FAIL_ANONYMOUS_REGISTER
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
