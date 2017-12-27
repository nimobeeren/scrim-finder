import React from 'react';
import PropTypes from 'prop-types';

import { PopupTypes } from "../reducers/PopupTypeReducer";
import ReplyFormContainer from "../containers/ReplyFormContainer";
import '../../styles/components/Popup.css';


const Popup = ({ popupType }) => {
	let content;
	switch (popupType) {
		case PopupTypes.reply:
			content = <ReplyFormContainer/>;
			break;

		default:
			content = null;
			break;
	}

	if (content) {
		return (
			<div className="popup__background">
				<div className="popup__wrapper">
					<div className="popup__content">
						{content}
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

Popup.propTypes = {
	popupType: PropTypes.string.isRequired
};

export default Popup;
