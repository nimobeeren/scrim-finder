import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LevelCheckboxes from "../containers/LevelCheckboxes";
import MapCheckboxes from "../containers/MapCheckboxes";
import ServerRadioButtons from "../containers/ServerRadioButtons";
import AgeRadioButtons from "../containers/AgeRadioButtons";
import ChevronToggle from "./ChevronToggle";
import Button from "./Button";
import '../../styles/Filters.css';

class Filters extends Component {
	constructor(props) {
		super(props);

		// Set default state
		this.state = {
			expanded: true,
			filters: {
				level: [],
				maps: [],
				server: null,
				maxAge: 'any'
			}
		};

		// Bind event handlers
		this.handleExpandedToggle = this.handleExpandedToggle.bind(this);
		this.handleLevelChange = this.handleLevelChange.bind(this);
		this.handleMapChange = this.handleMapChange.bind(this);
		this.handleServerChange = this.handleServerChange.bind(this);
		this.handleAgeChange = this.handleAgeChange.bind(this);
	}

	handleExpandedToggle() {
		this.setState({
			expanded: !this.state.expanded
		});
	}

	handleLevelChange(e, state) {
		let newState = this.state;
		newState.filters.level = state.checkedItems.map(n => parseInt(n, 10));

		this.setState(newState);

		const onChange = this.props.onChange;
		if (typeof onChange === 'function') {
			onChange(e, newState);
		}
	}

	handleMapChange(e, state) {
		let newState = this.state;
		newState.filters.maps = state.checkedItems;

		this.setState(newState);

		const onChange = this.props.onChange;
		if (typeof onChange === 'function') {
			onChange(e, newState);
		}
	}

	handleServerChange(e, newValue) {
		let newState = Object.assign({}, this.state, {
			filters: {
				server: newValue
			}
		});

		this.setState(newState);

		// Call action creator
		const onChange = this.props.onChange;
		if (typeof onChange === 'function') {
			onChange(e, newState);
		}
	}

	handleAgeChange(e, state) {
		// Determine maximum post age in minutes
		// Will match posts with a rounded down age that is newer than the user-selected age
		let maxAge;
		switch (state.selectedItem) {
			case '5mins':
				maxAge = 6;
				break;
			case '15mins':
				maxAge = 16;
				break;
			case '1hour':
				maxAge = 60 + 59;
				break;
			case '3hours':
				maxAge = 3 * 60 + 59;
				break;
			default:
				maxAge = null;
				break;
		}

		// Set new age filter state
		let newState = this.state;
		newState.filters.maxAge = maxAge;
		this.setState(newState);

		// Call action creator
		const onChange = this.props.onChange;
		if (typeof onChange === 'function') {
			onChange(e, newState);
		}
	}

	render() {
		const expanded = this.state.expanded;
		return (
			<div className="filters">
				<div className="filters__content">
					<div className="filters__header">
						<h3>Filters</h3>
						<Button
							className="btn btn--small"
							label="Reset"
							onClick={() => window.location = '/'}/>
						<ChevronToggle
							className="chevron--right chevron--mobile"
							pointUp={expanded}
							onClick={this.handleExpandedToggle}/>
					</div>
					<div className={"filters__fields " + (expanded ? "fields--expanded" : "")}>
						<fieldset>
							<legend>Level</legend>
							<LevelCheckboxes onChange={this.handleLevelChange}/>
						</fieldset>
						<fieldset>
							<legend>Maps</legend>
							<MapCheckboxes onChange={this.handleMapChange}/>
						</fieldset>
						<fieldset>
							<legend>Server</legend>
							<ServerRadioButtons onChange={this.handleServerChange}/>
						</fieldset>
						<fieldset>
							<legend>Post age</legend>
							<AgeRadioButtons onChange={this.handleAgeChange}/>
						</fieldset>
					</div>
				</div>
			</div>
		);
	}
}

Filters.propTypes = {
	onChange: PropTypes.func
};

export default Filters;
