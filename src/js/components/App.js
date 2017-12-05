import React from 'react';

import Popup from '../containers/Popup';
import NavBar from './NavBar';
import Aside from '../containers/Aside';
import Filters from '../containers/Filters';
import PostList from '../containers/PostList';
import '../../styles/components/App.css';


const App = () => (
	<div>
		<Popup/>
		<NavBar/>
		<div className="wrapper">
			<Aside/>
			<main>
				<Filters/>
				<PostList/>
			</main>
		</div>
	</div>
);

export default App;
