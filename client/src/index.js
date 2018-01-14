import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { fetchPosts } from "./js/actions/PostActions";
import App from './js/components/App';
import rootReducer from './js/reducers';

// Create Redux store with Thunk middleware
const store = createStore(
	rootReducer,
	applyMiddleware(ReduxThunk)
);

// Fetch posts when app loads
store.dispatch(fetchPosts());

// Render root component, wrapped in Redux provider
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);
