import {combineReducers} from 'redux';
import PostReducer from './PostReducer';

const rootReducer = combineReducers({
	posts: PostReducer
});

export default rootReducer;
