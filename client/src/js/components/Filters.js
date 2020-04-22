import React from "react";
import PropTypes from "prop-types";
import LevelCheckboxes from "../containers/LevelCheckboxes";
import MapCheckboxes from "../containers/MapCheckboxes";
import ServerRadioButtons from "../containers/ServerRadioButtons";
import AgeRadioButtons from "../containers/AgeRadioButtons";
import ChevronToggle from "./ChevronToggle";
import Button from "./Button";
import "../../styles/Filters.css";

const Filters = props => {
  const {
    expanded,
    onExpandedToggle,
    onLevelChange,
    onMapChange,
    onServerChange,
    onAgeChange
  } = props;

  return (
    <div className="filters">
      <div className="filters__content">
        <div className="filters__header">
          <h3>Filters</h3>
          <Button
            className="btn btn--small"
            label="Reset"
            onClick={() => (window.location = "/")}
          />
          <ChevronToggle
            className="chevron--right chevron--mobile"
            pointUp={expanded}
            onClick={onExpandedToggle}
          />
        </div>
        <div
          className={"filters__fields " + (expanded ? "fields--expanded" : "")}
        >
          <fieldset>
            <legend>Level</legend>
            <LevelCheckboxes onChange={onLevelChange} />
          </fieldset>
          <fieldset>
            <legend>Maps</legend>
            <MapCheckboxes onChange={onMapChange} />
          </fieldset>
          <fieldset>
            <legend>Server</legend>
            <ServerRadioButtons onChange={onServerChange} />
          </fieldset>
          <fieldset>
            <legend>Post age</legend>
            <AgeRadioButtons onChange={onAgeChange} />
          </fieldset>
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  expanded: PropTypes.bool,
  onExpandedToggle: PropTypes.func,
  onLevelChange: PropTypes.func,
  onMapChange: PropTypes.func,
  onServerChange: PropTypes.func,
  onAgeChange: PropTypes.func
};

export default Filters;
