import React from 'react';

import '../../styles/main.css';

import NavBar from './NavBar';
import Filters from '../containers/Filters';
import PostList from '../containers/PostList';

const App = () => (
	<div>
		<NavBar/>
		<Filters/>
		<PostList/>
	</div>
);

export default App;
