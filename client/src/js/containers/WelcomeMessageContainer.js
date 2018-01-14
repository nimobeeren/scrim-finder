import React from 'react';
import { connect } from "react-redux";
import WelcomeMessage from "../components/WelcomeMessage";

const WelcomeMessageContainer = ({ currentUser }) => {
	return <WelcomeMessage user={currentUser}/>
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

export default connect(mapStateToProps)(WelcomeMessageContainer);
