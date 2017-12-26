import React from 'react';
import PropTypes from 'prop-types';

import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import '../../styles/components/Filters.css';


function renderLevelCheckboxes(props) {
    const { levelNames, onLevelChange } = props;
    const items = levelNames.map((level, i) => {
        return {
            value: i,
            label: level,
            isChecked: false
        }
    });
    return <CheckboxGroup items={items} onChange={onLevelChange}/>;
}

function renderMapCheckboxes(props) {
    const { mapNames, onMapChange } = props;
    const items = mapNames.map(mapName => {
        return {
            value: mapName.toLowerCase(),
            label: mapName,
            isChecked: false
        }
    });
    return <CheckboxGroup items={items} onChange={onMapChange}/>;
}

function renderServerRadioButtons(props) {
    const { onServerChange } = props;
    return <RadioGroup
        items={[
            {
                value: 'any',
                label: "On/Off"
            },
            {
                value: 'on',
                label: "On"
            },
            {
                value: 'off',
                label: "Off"
            }
        ]}
        defaultItem={'any'}
        onChange={onServerChange}/>;
}

function renderAgeRadioButtons(props) {
    const { onAgeChange } = props;
    return <RadioGroup
        items={[
            {
                value: '5mins',
                label: "< 5 mins"
            },
            {
                value: '15mins',
                label: "< 15 mins"
            },
            {
                value: '1hour',
                label: "< 1 hour"
            },
            {
                value: '3hours',
                label: "< 3 hours"
            },
            {
                value: 'any',
                label: "Any"
            }
        ]}
        defaultItem={'any'}
        onChange={onAgeChange}/>
}

const Filters = (props) => (
    <div className="filters">
        <div className="filters__content">
            <h3>Filters</h3>
            <div className="filters__fields">
                <fieldset>
                    <legend>Level</legend>
                    {renderLevelCheckboxes(props)}
                </fieldset>
                <fieldset>
                    <legend>Maps</legend>
                    {renderMapCheckboxes(props)}
                </fieldset>
                <fieldset>
                    <legend>Server</legend>
                    {renderServerRadioButtons(props)}
                </fieldset>
                <fieldset>
                    <legend>Post age</legend>
                    {renderAgeRadioButtons(props)}
                </fieldset>
            </div>
        </div>
    </div>
);

Filters.propTypes = {
    levelNames: PropTypes.array.isRequired,
    mapNames: PropTypes.array.isRequired,
    onLevelChange: PropTypes.func,
    onMapChange: PropTypes.func,
    onServerChange: PropTypes.func,
    onAgeChaneg: PropTypes.func
};

export default Filters;
