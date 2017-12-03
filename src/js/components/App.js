import React, {Component} from 'react';

import '../../styles/main.css';

import NavBar from './NavBar';
import Filters from './Filters';
import PostList from '../containers/PostList';

const allLevels = [
	"Low",
	"Medium",
	"High",
	"Top"
];

const allMaps = [
	"cache", "cbble", "dust2", "inferno", "mirage", "nuke", "overpass", "train"
];

class App extends Component {
	render() {
		return (
			<div>
				<NavBar/>
				<Filters levels={allLevels} maps={allMaps}/>
				<PostList
					levels={allLevels}/>
			</div>
		);
	}
}

export default App;
