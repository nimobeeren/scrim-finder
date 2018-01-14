import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logOut } from '../actions/AuthenticateActions';
import Button from "../components/Button";

const LogInOutButton = ({ currentUser, logOut }) => {
	console.log(currentUser);
	if (currentUser && currentUser.steamId) {
		// User is already logged in
		return <Button className="btn btn--nav"
					   label="Log out"
					   onClick={logOut}/>
	}
	return <Button className="btn btn--nav"
				   label="Log in"
				   href="/auth/login"/>
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

function mapDispatchToState(dispatch) {
	return bindActionCreators({
		logOut
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToState)(LogInOutButton);
