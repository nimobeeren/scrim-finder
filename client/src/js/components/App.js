import React from 'react';

import NavBar from './NavBar';
import LoginHelper from "../containers/LoginHelper";
import Popup from '../containers/Popup';
import Filters from '../containers/Filters';
import CreatePost from '../containers/CreatePostContainer'
import PostList from '../containers/PostList';
import '../../styles/components/App.css';


const App = () => (
	<div>
		<LoginHelper/>
		<Popup/>
		<NavBar/>
		<Filters/>
		<section>
			<CreatePost/>
			<PostList/>
		</section>
	</div>
);

export default App;
