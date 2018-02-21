import * as GameActionTypes from '../actiontypes/actiontypes_game';

export const updateGameState = payload => {
	return {
		type: GameActionTypes.UPDATE_GAME_STATE,
		payload
	}
}

export const updateSingleProp = (data, type) => {
	return {
		type: GameActionTypes[type],
		data
	}
}
