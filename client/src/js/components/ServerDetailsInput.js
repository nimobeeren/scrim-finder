import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/ServerDetailsInput.css';

const ServerDetailsInput = ({ onIPChange, onPasswordChange }) => (
	<div className="server-details">
		<input type="text" placeholder="Server IP" onChange={onIPChange}/>
		<input type="text" placeholder="Password" onChange={onPasswordChange}/>
	</div>
);

ServerDetailsInput.propTypes = {
	onIPChange: PropTypes.func,
	onPasswordChange: PropTypes.func
};

export default ServerDetailsInput;
