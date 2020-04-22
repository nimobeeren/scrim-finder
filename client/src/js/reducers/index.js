import { combineReducers } from "redux";
import ActivePostReducer from "./ActivePostReducer";
import CurrentUserReducer from "./CurrentUserReducer";
import DraftingPostReducer from "./DraftingPostReducer";
import FiltersReducer from "./FiltersReducer";
import LevelNameReducer from "./LevelNameReducer";
import MapNameReducer from "./MapNameReducer";
import PendingReplyPostsReducer from "./PendingReplyPostsReducer";
import PopupTypeReducer from "./PopupTypeReducer";
import PostReducer from "./PostReducer";

const rootReducer = combineReducers({
  activePost: ActivePostReducer,
  currentUser: CurrentUserReducer,
  draftingPost: DraftingPostReducer,
  filters: FiltersReducer,
  levelNames: LevelNameReducer,
  mapNames: MapNameReducer,
  pendingReplyPosts: PendingReplyPostsReducer,
  popupType: PopupTypeReducer,
  posts: PostReducer,
});

export default rootReducer;
