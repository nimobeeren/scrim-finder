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
            level: [],
            maps: [],
            server: null,
            maxAge: 'any'
        };

        // Bind event handlers
        this.handleLevelChange = this.handleLevelChange.bind(this);
        this.handleMapChange = this.handleMapChange.bind(this);
        this.handleServerChange = this.handleServerChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
    }

    handleFilterChange(e, state) {
        // Call action creator
        this.props.handleChange(state);
    }

    handleLevelChange(e, state) {
        let newState = this.state;
        newState.level = state.checkedItems.map(n => parseInt(n, 10));
        this.setState(newState);
        this.handleFilterChange(e, newState);
    }

    handleMapChange(e, state) {
        let newState = this.state;
        newState.maps = state.checkedItems;
        this.setState(newState);
        this.handleFilterChange(e, newState);
    }

    handleServerChange(e, state) {
        let newState;
        switch (state.selectedItem) {
            case 'on':
                newState = Object.assign({}, this.state, {
                    server: true
                });
                break;
            case 'off':
                newState = Object.assign({}, this.state, {
                    server: false
                });
                break;
            default:
                newState = Object.assign({}, this.state, {
                    server: null
                });
                break;
        }

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
        newState.maxAge = maxAge;
        this.setState(newState);

        // Call action creator
        this.handleFilterChange(e, newState);
    }

    render() {
        return (
            <Filters
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
