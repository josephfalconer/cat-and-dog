import * as StatsActionTypes from '../actiontypes/actiontypes_stats';

const initialState = {
	mealsEaten: 0,
}

export default function Timer(state=initialState, action) {

	switch (action.type) {
		case StatsActionTypes.UPDATE_MEALS_EATEN:
			return {
				...state,
				mealsEaten: action.data
			}

		default:
			return state;
	}
}