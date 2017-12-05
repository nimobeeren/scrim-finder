import {combineReducers} from 'redux';

import PostReducer from './PostReducer';
import AllLevelsReducer from './AllLevelsReducer';
import AllMapsReducer from './AllMapsReducer';
import PopupReducer from './PopupReducer';


const rootReducer = combineReducers({
	posts: PostReducer,
	allLevels: AllLevelsReducer,
	allMaps: AllMapsReducer,
	popupType: PopupReducer
});

export default rootReducer;
