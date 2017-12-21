import { SUCCESS_ANONYMOUS_LOGIN } from "../actions/LoginActions";
import { SUCCESS_ANONYMOUS_REGISTER } from "../actions/RegisterActions";


function currentUserReducer(state, action) {
	switch (action.type) {
		case SUCCESS_ANONYMOUS_LOGIN:
		case SUCCESS_ANONYMOUS_REGISTER:
			localStorage.setItem('userId', action.user.id);
			localStorage.setItem('token', action.user.token);
			return action.user;

		default:
			if (!state) {
				const id = localStorage.getItem('userId'),
					token = localStorage.getItem('token');
				if (id && token) {
					return { id, token };
				}
				return null;
			}
			return state;
	}

}

export default currentUserReducer;
