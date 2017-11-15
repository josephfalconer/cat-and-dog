import * as StatsActionTypes from '../actiontypes/actiontypes_stats';

const initialState = {
	stats: {
		mealsEaten: 0,
		energy: 10
	}
}

export default function Timer(state=initialState, action) {

	switch (action.type) {
		case StatsActionTypes.UPDATE_STATS:
			return {
				...state,
				stats: action.data
			}

		default:
			return state;
	}
}