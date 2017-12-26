import React from 'react';
import PropTypes from 'prop-types';

import Button from "./Button";
import '../../styles/components/CreatePostButton.css';


const CreatePostButton = (props) => (
	<div className="create-post__wrapper wrapper--btn">
		<Button className="btn btn--large" label="Create post" onClick={props.onClick}/>
	</div>
);

CreatePostButton.propTypes = {
	onClick: PropTypes.func
};

export default CreatePostButton;
