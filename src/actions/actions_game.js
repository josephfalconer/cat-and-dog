import * as GameActionTypes from '../actiontypes/actiontypes_game';

export const updateGame = (data, type) => {
	return {
		type: GameActionTypes[type],
		data
	}
}
