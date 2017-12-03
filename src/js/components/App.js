import React, {Component} from 'react';

import '../../styles/main.css';

import NavBar from './NavBar';
import Filters from '../containers/Filters';
import PostList from '../containers/PostList';

class App extends Component {
	render() {
		return (
			<div>
				<NavBar/>
				<Filters/>
				<PostList/>
			</div>
		);
	}
}

export default App;
