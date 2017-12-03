import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../../styles/components/Filters.css';

import Card from './../components/Card';
import Checkbox from './../components/Checkbox';
import RadioGroup from './../components/RadioGroup';

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
				<div className="filters">
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
								min5: "< 5 mins",
								min15: "< 15 mins",
								hour1: "< 1 hour",
								hour3: "< 3 hours",
								any: "Any"
							}}
							defaultItem={"any"}/>
					</fieldset>
				</div>
			</Card>
		);
	}
}

function mapStateToProps(state) {
	return {
		levels: state.allLevels,
		maps: state.allMaps
	};
}

export default connect(mapStateToProps)(Filters);
