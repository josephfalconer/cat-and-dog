import * as StatsActionTypes from '../actiontypes/actiontypes_stats';

export const updateStats = (data, type) => {
	return {
		type: StatsActionTypes[type],
		data
	}
}