import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './../../styles/components/Filters.css';

import Card from './Card';
import Checkbox from './Checkbox';
import RadioGroup from './RadioGroup';

class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			levelFilter: [],
			mapFilter: []
		}
	}

	createLevelCheckboxes() {
		return this.props.levels.map((level, i) => (
			<Checkbox
				label={level}
				key={"checkbox-level" + i}/>
		));
	}

	createMapCheckboxes() {
		return this.props.maps.map((mapName, i) => (
			<Checkbox
				label={mapName}
				key={"checkbox-map" + i}/>
		));
	}

	render() {
		return (
			<Card className="card card--secondary">
				<h3>Filters</h3>
				<fieldset>
					<legend>Level</legend>
					{this.createLevelCheckboxes()}
				</fieldset>
				<fieldset>
					<legend>Maps</legend>
					{this.createMapCheckboxes()}
				</fieldset>
				<fieldset>
					<legend>Server</legend>
					<RadioGroup
						items={{
							noPreference: "On/Off",
							on: "On",
							off: "Off"
						}}/>
				</fieldset>
				<fieldset>
					<legend>Post age</legend>
					<RadioGroup
						items={{
							min5: "< 5 minutes",
							min15: "< 15 minutes",
							hour1: "< 1 hour",
							hour3: "< 3 hours"
						}}/>
				</fieldset>
			</Card>
		);
	}
}

Filters.propTypes = {
	levels: PropTypes.array.isRequired,
	maps: PropTypes.array.isRequired
};

export default Filters;
