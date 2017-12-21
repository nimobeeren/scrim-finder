import React from 'react';

import NavBar from './NavBar';
import LoginHelper from "../containers/LoginHelper";
import Popup from '../containers/Popup';
import Filters from '../containers/Filters';
import CreatePost from '../containers/CreatePost'
import PostList from '../containers/PostList';
import '../../styles/components/App.css';


const App = () => (
	<div>
		<LoginHelper/>
		<Popup/>
		<NavBar/>
		<main>
			<Filters/>
			<CreatePost/>
			<PostList/>
		</main>
	</div>
);

export default App;
