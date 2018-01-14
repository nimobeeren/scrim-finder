import { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authenticate } from "../actions/AuthenticateActions";
import { anonymousRegister } from "../actions/RegisterActions";

class LoginHelper extends Component {
	componentDidMount() {
		const { currentUser, authenticate, anonymousRegister } = this.props;
		if (currentUser) {
			authenticate(currentUser);
		} else {
			anonymousRegister();
		}
	}

	render() {
		return null;
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		authenticate,
		anonymousRegister
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginHelper);
