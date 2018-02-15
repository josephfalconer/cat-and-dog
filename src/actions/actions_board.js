import * as BoardActionTypes from '../actiontypes/actiontypes_board';

export const updateBoard = (data, type) => {
	return {
		type: BoardActionTypes[type],
		data
	}
}
