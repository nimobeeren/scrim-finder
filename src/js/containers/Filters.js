import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeFilter} from '../actions/FilterActions';
import Card from '../components/Card';
import RadioGroup from '../components/RadioGroup';
import CheckboxGroup from "../components/CheckboxGroup";
import '../../styles/components/Filters.css';


class Filters extends Component {
	constructor(props) {
		super(props);

		// Set default state
		this.state = {
			allowedLevels: [],
			allowedMaps: [],
			allowedServer: undefined,
			maxAllowedAge: 'any'
		};

		// Bind event handlers
		this.handleLevelChanged = this.handleLevelChanged.bind(this);
		this.handleMapChanged = this.handleMapChanged.bind(this);
		this.handleServerChanged = this.handleServerChanged.bind(this);
		this.handleAgeChanged = this.handleAgeChanged.bind(this);
	}

	handleFilterChanged(e, state) {
		// Call action creator
		this.props.changeFilter(state);
	}

	handleLevelChanged(e, state) {
		let newState = this.state;
		newState.allowedLevels = state.checkedItems;
		this.setState(newState);
		this.handleFilterChanged(e, newState);
	}

	handleMapChanged(e, state) {
		let newState = this.state;
		newState.allowedMaps = state.checkedItems;
		this.setState(newState);
		this.handleFilterChanged(e, newState);
	}

	handleServerChanged(e, state) {
		// Determine new server filter state
		// TODO: Don't do bools here
		let serverState;
		if (state.selectedItem === 'on') {
			serverState = true;
		} else if (state.selectedItem === 'off') {
			serverState = false;
		} // else undefined

		// Set new server filter state
		let newState = this.state;
		newState.allowedServer = serverState;
		this.setState(newState);

		// Call action creator
		this.handleFilterChanged(e, newState);
	}

	handleAgeChanged(e, state) {
		// Determine maximum post age in milliseconds
		let maxAge;
		switch(state.selectedItem) {
			case 'min5':
				maxAge = (5 * 60 + 59) * 1000;
				break;
			case 'min15':
				maxAge = (15 * 60 + 59) * 1000;
				break;
			case 'hour1':
				maxAge = (60 + 59) * 60 * 1000;
				break;
			case 'hour3':
				maxAge = (3 * 60 + 59) * 60 * 1000;
				break;
			default:
				maxAge = false;
				break;
		}

		// Set new age filter state
		let newState = this.state;
		newState.maxAllowedAge = maxAge;
		this.setState(newState);

		// Call action creator
		this.handleFilterChanged(e, newState);
	}

	createLevelCheckboxes() {
		const {levels} = this.props;
		let items = {};
		for (let i = 0; i < levels.length; i++) {
			items[levels[i]] = false;
		}
		return <CheckboxGroup items={items} onChange={this.handleLevelChanged}/>;
	}

	createMapCheckboxes() {
		const {maps} = this.props;
		let items = {};
		for (let i = 0; i < maps.length; i++) {
			items[maps[i]] = false;
		}
		return <CheckboxGroup items={items} onChange={this.handleMapChanged}/>
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
							}}
							onChange={this.handleServerChanged}/>
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
							defaultItem={'any'}
							onChange={this.handleAgeChanged}/>
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeFilter: changeFilter
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
