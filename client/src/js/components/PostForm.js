import React from "react";
import PropTypes from "prop-types";
import LevelRadioButtons from "../containers/LevelRadioButtons";
import MapCheckboxes from "../containers/MapCheckboxes";
import ServerDetailsInput from "./ServerDetailsInput";
import Button from "./Button";
import SubmitButton from "./SubmitButton";
import "../../styles/PostForm.css";
import ServerRadioButtons from "../containers/ServerRadioButtons";

const PostForm = ({
  shouldHaveIPPW,
  onTeamNameChange,
  onLevelChange,
  onMapsChange,
  onServerChange,
  onIPChange,
  onPasswordChange,
  onSubmit,
  onCancel,
}) => (
  <form className="post-form" onSubmit={onSubmit}>
    <fieldset>
      <legend>Team Name</legend>
      <input
        type="text"
        placeholder="Anonymous"
        autoFocus
        onChange={onTeamNameChange}
      />
    </fieldset>
    <fieldset>
      <legend>Level</legend>
      <LevelRadioButtons onChange={onLevelChange} />
    </fieldset>
    <fieldset id="new-post-maps">
      <legend>Maps</legend>
      <MapCheckboxes onChange={onMapsChange} />
    </fieldset>
    <fieldset id="new-post-server">
      <legend>Server</legend>
      <ServerRadioButtons onChange={onServerChange} />
      {shouldHaveIPPW && (
        <ServerDetailsInput
          onIPChange={onIPChange}
          onPasswordChange={onPasswordChange}
        />
      )}
    </fieldset>
    <div className="post-form__controls">
      <div className="post-form__btn-wrapper">
        <SubmitButton className="btn" label="Create" />
      </div>
      <div className="post-form__btn-wrapper">
        <Button className="btn" label="Cancel" onClick={onCancel} />
      </div>
    </div>
  </form>
);

PostForm.propTypes = {
  shouldHaveIPPW: PropTypes.bool,
  onTeamNameChange: PropTypes.func,
  onLevelChange: PropTypes.func,
  onMapsChange: PropTypes.func,
  onServerChange: PropTypes.func,
  onIPChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PostForm;
