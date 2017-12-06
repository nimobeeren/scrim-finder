import React from 'react';
import {connect} from "react-redux";

import PostReplyForm from "./PostReplyForm";
import '../../styles/containers/Popup.css';


const Popup = (props) => {
	switch (props.popupType) {
		case 'POST_REPLY':
			const {activePost} = props;
			return (
				<div className="popup__background">
					<div className="popup__content">
						<PostReplyForm
							teamName={activePost.teamName}
							maps={activePost.maps}/>
					</div>
				</div>
			);

		default:
			return null;
	}
};

function mapStateToProps(state) {
	return {
		popupType: state.popupType,
		activePost: state.activePost
	};
}

export default connect(mapStateToProps)(Popup);
