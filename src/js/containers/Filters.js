import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeFilter} from '../actions/FilterActions';
import RadioGroup from '../components/RadioGroup';
import CheckboxGroup from "../components/CheckboxGroup";
import '../../styles/containers/Filters.css';


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
		// Set new server filter state
		let newState = this.state;
		newState.allowedServer = state.selectedItem;
		this.setState(newState);

		// Call action creator
		this.handleFilterChanged(e, newState);
	}

	handleAgeChanged(e, state) {
		// Determine maximum post age in milliseconds
		let maxAge;
		switch(state.selectedItem) {
			case '5mins':
				maxAge = (5 * 60 + 59) * 1000;
				break;
			case '15mins':
				maxAge = (15 * 60 + 59) * 1000;
				break;
			case '1hour':
				maxAge = (60 + 59) * 60 * 1000;
				break;
			case '3hours':
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
		const items = levels.map(level => {
			return {
				value: level.toLowerCase(),
				label: level,
				isChecked: false
			}
		});
		return <CheckboxGroup items={items} onChange={this.handleLevelChanged}/>;
	}

	createMapCheckboxes() {
		const {maps} = this.props;
		const items = maps.map(mapName => {
			return {
				value: mapName.toLowerCase(),
				label: mapName,
				isChecked: false
			}
		});
		return <CheckboxGroup items={items} onChange={this.handleMapChanged}/>;
	}

	createServerRadioButtons() {
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
			onChange={this.handleServerChanged}/>;
	}

	createAgeRadioButtons() {
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
			onChange={this.handleAgeChanged}/>
	}

	render() {
		return (
			<div className="filters">
				<div className="filters__content">
					<h3 className="filters__title">Filters</h3>
					<div className="filters__fields">
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
							{this.createServerRadioButtons()}
						</fieldset>
						<fieldset>
							<legend>Post age</legend>
							{this.createAgeRadioButtons()}
						</fieldset>
					</div>
				</div>
			</div>
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
