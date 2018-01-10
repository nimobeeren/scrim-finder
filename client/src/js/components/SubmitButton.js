import React from 'react';

const SubmitButton = (props) => {
	return (
		<input
			type="submit"
			className={props.className}
			value={props.label}
			onClick={props.onClick}/>
	)
};

export default SubmitButton;
