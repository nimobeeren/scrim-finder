import {combineReducers} from 'redux';

import PostReducer from './PostReducer';
import AllLevelsReducer from './AllLevelsReducer';
import AllMapsReducer from './AllMapsReducer';
import PopupReducer from './PopupReducer';
import DraftingPostReducer from './DraftingPostReducer';


const rootReducer = combineReducers({
	posts: PostReducer,
	allLevels: AllLevelsReducer,
	allMaps: AllMapsReducer,
	popupType: PopupReducer,
	draftingPost: DraftingPostReducer
});

export default rootReducer;
