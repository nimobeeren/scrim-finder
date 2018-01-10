import React from 'react';
import NavBar from './NavBar';
import LoginHelper from "../containers/LoginHelper";
import Popup from '../containers/PopupContainer';
import Filters from '../containers/FiltersContainer';
import CreatePostContainer from '../containers/CreatePostContainer'
import PostListContainer from '../containers/PostListContainer';
import '../../styles/App.css';

const App = () => (
	<div>
		<LoginHelper/>
		<Popup/>
		<NavBar/>
		<Filters/>
		<section>
			<CreatePostContainer/>
			<PostListContainer/>
		</section>
	</div>
);

export default App;
