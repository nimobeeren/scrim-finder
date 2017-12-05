import React from 'react';
import {connect} from "react-redux";

import PostForm from '../containers/PostForm';
import '../../styles/components/Popup.css';


const Popup = (props) => {
	if (props.popupType === 'create-post') {
		return (
			<div className="popup-background">
				<div className="popup-content">
					<PostForm/>
				</div>
			</div>
		)
	}
	return null;
};

function mapStateToProps(state) {
	return {
		popupType: state.popupType
	};
}

export default connect(mapStateToProps)(Popup);
