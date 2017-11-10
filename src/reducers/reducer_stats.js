import * as StatsActionTypes from '../actiontypes/actiontypes_stats';

const initialState = {
	isInGame: true,
}

export default function Timer(state=initialState, action) {

	switch (action.type) {
		case StatsActionTypes.UPDATE_GAME_STATUS:
			return {
				...state,
				isInGame: action.data
			}

		default:
			return state;
	}
}