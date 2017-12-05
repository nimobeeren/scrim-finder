import React from 'react';
import {createPostButtonClick} from "../actions/CreatePostActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Button from './Button';
import '../../styles/components/Aside.css';

const Aside = (props) => {
	return (
		<aside>
			<div className="create-post">
				<Button className="btn btn--large" label="Create post" onClick={props.handleClick}/>
			</div>
		</aside>
	);
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		handleClick: createPostButtonClick
	}, dispatch)
}

export default connect(mapDispatchToProps)(Aside);
