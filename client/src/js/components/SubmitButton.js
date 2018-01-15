import React from 'react';

const SubmitButton = ({ className, label, onClick }) => {
	return (
		<input
			type="submit"
			className={className}
			value={label}
			onClick={onClick}/>
	)
};

export default SubmitButton;
