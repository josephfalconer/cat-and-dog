import * as StatsActionTypes from '../actiontypes/actiontypes_stats';

const initialState = {
	isShowing: false,
	stats: {
		mealsEaten: 0,
		energy: 10,
		secondsRemaining: 60
	}
}

export default function Timer(state=initialState, action) {

	switch (action.type) {
		case StatsActionTypes.UPDATE_STATS:
			return {
				...state,
				stats: action.data
			}

		case StatsActionTypes.SHOW_STATS:
			return {
				...state,
				isShowing: action.data
			}

		default:
			return state;
	}
}