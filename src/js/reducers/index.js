import {combineReducers} from 'redux';

import PostReducer from './PostReducer';
import AllLevelsReducer from './AllLevelsReducer';
import AllMapsReducer from './AllMapsReducer';
import PopupReducer from './PopupReducer';
import DraftingPostReducer from './DraftingPostReducer';
import FiltersReducer from './FiltersReducer';


const rootReducer = combineReducers({
	posts: PostReducer,
	allLevels: AllLevelsReducer,
	allMaps: AllMapsReducer,
	popupType: PopupReducer,
	draftingPost: DraftingPostReducer,
	filters: FiltersReducer
});

export default rootReducer;
