import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import {fetchPosts} from "./js/actions/PostActions";
import App from './js/components/App';
import rootReducer from './js/reducers';

const store = createStore(
	rootReducer,
	applyMiddleware(ReduxThunk)
);

store.dispatch(fetchPosts());

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);
