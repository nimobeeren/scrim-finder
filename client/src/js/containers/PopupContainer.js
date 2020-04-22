import React from "react";
import { connect } from "react-redux";
import Popup from "../components/Popup";

const PopupContainer = ({ popupType }) => {
  if (popupType) {
    return <Popup popupType={popupType} />;
  } else {
    return null;
  }
};

function mapStateToProps(state) {
  return {
    popupType: state.popupType,
  };
}

export default connect(mapStateToProps)(PopupContainer);
