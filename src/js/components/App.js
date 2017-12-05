import React from 'react';

import Popup from '../containers/Popup';
import NavBar from './NavBar';
import Filters from '../containers/Filters';
import PostList from '../containers/PostList';
import '../../styles/components/App.css';


const App = () => (
	<div>
		<Popup/>
		<NavBar/>
		<Filters/>
		<PostList/>
	</div>
);

export default App;
