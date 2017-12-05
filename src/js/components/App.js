import React from 'react';

import NavBar from './NavBar';
import Aside from './Aside';
import Filters from '../containers/Filters';
import PostList from '../containers/PostList';
import '../../styles/components/App.css';


const App = () => (
	<div>
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
