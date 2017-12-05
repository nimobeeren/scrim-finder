import React from 'react';


import NavBar from './NavBar';
import Filters from '../containers/Filters';
import PostList from '../containers/PostList';
import '../../styles/main.css';

const App = () => (
	<div>
		<NavBar/>
		<Filters/>
		<PostList/>
	</div>
);

export default App;
