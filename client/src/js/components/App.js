import React from 'react';
import NavBar from './NavBar';
import LoginHelper from "../containers/LoginHelper";
import Popup from '../containers/PopupContainer';
import Filters from '../containers/FiltersContainer';
import CreatePostContainer from '../containers/CreatePostContainer'
import PostList from '../containers/PostList';
import '../../styles/components/App.css';

const App = () => (
	<div>
		<LoginHelper/>
		<Popup/>
		<NavBar/>
		<Filters/>
		<section>
			<CreatePostContainer/>
			<PostList/>
		</section>
	</div>
);

export default App;
