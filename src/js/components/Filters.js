import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './../../styles/components/Filters.css';

import Card from './Card';
import Checkbox from './Checkbox';
import FilterServer from "./FilterServer";

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
			</Card>
		);
	}
}

Filters.propTypes = {
	levels: PropTypes.array.isRequired,
	maps: PropTypes.array.isRequired
};

export default Filters;
