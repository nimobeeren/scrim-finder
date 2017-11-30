import React, {Component} from 'react';
import Post from './Post';
import NavBar from './NavBar';

import '../../styles/main.css';

class App extends Component {
	render() {
		return (
			<div>
				<NavBar/>
				<Post
					teamName="Nehox"
					level="Top"
					maps={['inferno', 'cache', 'overpass']}
					server={true}/>
			</div>
		);
	}
}

export default App;
