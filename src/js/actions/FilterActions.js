export const changeFilter = (filters) => {
	return {
		type: 'FILTER_CHANGED',
		payload: filters
	};
};
