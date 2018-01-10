import { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { anonymousLogin } from "../actions/LoginActions";
import { anonymousRegister } from "../actions/RegisterActions";

class LoginHelper extends Component {
	componentWillMount() {
		if (this.props.currentUser) {
			this.props.anonymousLogin(this.props.currentUser);
		} else {
			this.props.anonymousRegister();
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
		anonymousLogin,
		anonymousRegister
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginHelper);
