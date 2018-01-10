import React from 'react';
import PropTypes from 'prop-types';
import LevelCheckboxes from "../containers/LevelCheckboxes";
import MapCheckboxes from "../containers/MapCheckboxes";
import ServerRadioButtons from "../containers/ServerRadioButtons";
import AgeRadioButtons from "../containers/AgeRadioButtons";
import '../../styles/components/Filters.css';

const Filters = ({ onLevelChange, onMapChange, onServerChange, onAgeChange }) => (
    <div className="filters">
        <div className="filters__content">
            <h3>Filters</h3>
            <div className="filters__fields">
                <fieldset>
                    <legend>Level</legend>
					<LevelCheckboxes onChange={onLevelChange}/>
                </fieldset>
                <fieldset>
                    <legend>Maps</legend>
					<MapCheckboxes onChange={onMapChange}/>
                </fieldset>
                <fieldset>
                    <legend>Server</legend>
					<ServerRadioButtons onChange={onServerChange}/>
                </fieldset>
                <fieldset>
                    <legend>Post age</legend>
					<AgeRadioButtons onChange={onAgeChange}/>
                </fieldset>
            </div>
        </div>
    </div>
);

Filters.propTypes = {
    onLevelChange: PropTypes.func,
    onMapChange: PropTypes.func,
    onServerChange: PropTypes.func,
	onAgeChange: PropTypes.func
};

export default Filters;
