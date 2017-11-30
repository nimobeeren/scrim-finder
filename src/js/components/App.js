import React, {Component} from 'react';
import PostList from './PostList';
import NavBar from './NavBar';

import '../../styles/main.css';

class App extends Component {
	render() {
		return (
			<div>
				<NavBar/>
				<PostList
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
