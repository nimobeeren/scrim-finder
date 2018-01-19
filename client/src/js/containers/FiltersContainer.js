import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeFilterAndFetch } from '../actions/FilterActions';
import Filters from '../components/Filters';

const FiltersContainer = ({ handleChange }) => (
	<Filters onChange={handleChange}/>
);

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		handleChange: changeFilterAndFetch
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(FiltersContainer);
