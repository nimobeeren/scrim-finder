import { LOGIN_ANONYMOUS_SUCCESS } from "../actions/LoginActions";
import { ANONYMOUS_REGISTER_SUCCESS } from "../actions/RegisterActions";


function currentUserReducer(state, action) {
	switch (action.type) {
		case LOGIN_ANONYMOUS_SUCCESS:
		case ANONYMOUS_REGISTER_SUCCESS:
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
