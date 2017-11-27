import React, { Component } from 'react';
import Post from './Post';

import './../styles/normalize.css'

export default class App extends Component {
	render() {
		return (
			<div>
				<Post
					teamName="Nehox"
					level="Top"
					maps={['cache', 'inferno', 'overpass']}
					server={true}/>
			</div>
		);
	}
}
