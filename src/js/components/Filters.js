import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import Checkbox from './Checkbox';

import './../../styles/components/Filters.css';

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

	render() {
		return (
			<Card className="card card--secondary">
				<h3>Filters</h3>
				<fieldset>
					<legend>Level</legend>
					{this.createLevelCheckboxes()}
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
