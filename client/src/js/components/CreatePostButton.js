import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import "../../styles/CreatePostButton.css";

const CreatePostButton = ({ onClick }) => (
  <div className="create-post__wrapper wrapper--btn">
    <Button className="btn btn--large" label="Create post" onClick={onClick} />
  </div>
);

CreatePostButton.propTypes = {
  onClick: PropTypes.func,
};

export default CreatePostButton;
