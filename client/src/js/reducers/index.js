import { combineReducers } from 'redux';
import PostReducer from './PostReducer';
import LevelNameReducer from './LevelNameReducer';
import MapNameReducer from './MapNameReducer';
import PopupReducer from './PopupTypeReducer';
import DraftingPostReducer from './DraftingPostReducer';
import FiltersReducer from './FiltersReducer';
import ActivePostReducer from './ActivePostReducer';
import CurrentUserReducer from './CurrentUserReducer';
import PendingReplyPostsReducer from './PendingReplyPostsReducer';

const rootReducer = combineReducers({
	posts: PostReducer,
	levelNames: LevelNameReducer,
	mapNames: MapNameReducer,
	popupType: PopupReducer,
	draftingPost: DraftingPostReducer,
	filters: FiltersReducer,
	activePost: ActivePostReducer,
	currentUser: CurrentUserReducer,
	pendingReplyPosts: PendingReplyPostsReducer
});

export default rootReducer;
