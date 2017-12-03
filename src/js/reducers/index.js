import {combineReducers} from 'redux';

import PostReducer from './PostReducer';
import AllLevelsReducer from './AllLevelsReducer';
import AllMapsReducer from './AllMapsReducer';

const rootReducer = combineReducers({
	posts: PostReducer,
	allLevels: AllLevelsReducer,
	allMaps: AllMapsReducer
});

export default rootReducer;
