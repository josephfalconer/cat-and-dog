import * as GameActionTypes from '../actiontypes/actiontypes_game';

const initialState = {
	isInGame: true
}

export default function Timer(state=initialState, action) {

	switch (action.type) {
		case GameActionTypes.UPDATE_GAME_STATUS:
			return {
				...state,
				isInGame: action.data
			}

		default:
			return state;
	}
}