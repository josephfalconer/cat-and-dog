import * as BoardActionTypes from '../actiontypes/actiontypes_board';

export const updateBoard = (data, type) => {
	return {
		type: BoardActionTypes[type],
		data
	}
}

export const updateBoardState = (key, payload) => {
	return {
		type: BoardActionTypes.UPDATE_BOARD_STATE,
		key,
		payload
	}
}
