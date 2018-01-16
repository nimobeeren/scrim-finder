import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeFilterAndFetch } from '../actions/FilterActions';
import Filters from '../components/Filters';

class FiltersContainer extends Component {
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

	handleFilterChange(e, state) {
		// Call action creator
		this.props.handleChange(state.filters);
	}

	handleLevelChange(e, state) {
		let newState = this.state;
		newState.filters.level = state.checkedItems.map(n => parseInt(n, 10));
		this.setState(newState);
		this.handleFilterChange(e, newState);
	}

	handleMapChange(e, state) {
		let newState = this.state;
		newState.filters.maps = state.checkedItems;
		this.setState(newState);
		this.handleFilterChange(e, newState);
	}

	handleServerChange(e, newValue) {
		let newState = Object.assign({}, this.state, {
			filters: {
				server: newValue
			}
		});

		this.setState(newState);

		// Call action creator
		this.handleFilterChange(e, newState);
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
		this.handleFilterChange(e, newState);
	}

	render() {
		return (
			<Filters
				expanded={this.state.expanded}
				onExpandedToggle={this.handleExpandedToggle}
				onLevelChange={this.handleLevelChange}
				onMapChange={this.handleMapChange}
				onServerChange={this.handleServerChange}
				onAgeChange={this.handleAgeChange}/>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		handleChange: changeFilterAndFetch
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(FiltersContainer);
