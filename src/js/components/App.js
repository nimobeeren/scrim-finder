import React, {Component} from 'react';

import NavBar from './NavBar';
import Filters from './Filters';
import PostList from './PostList';

import '../../styles/main.css';

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
					levels={allLevels}
					posts={[
						{
							teamName: "Nehox",
							level: "Top",
							maps: ["cache", "overpass", "nuke", "cbble", "mirage", "train"],
							server: true
						},
						{
							teamName: "Team Adrian",
							level: "High",
						},
						{
							teamName: "MouseMafia",
							level: "Medium",
							maps: ["cache", "overpass", "cbble", "mirage"],
							server: false
						}
					]}
					/>
			</div>
		);
	}
}

export default App;
