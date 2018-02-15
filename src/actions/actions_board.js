import * as BoardActionTypes from '../actiontypes/actiontypes_board';

export const updateBoard = (data, type) => {
	if (type === 'UPDATE_SPACES') {
		console.log('action', data);
	}
	return {
		type: BoardActionTypes[type],
		data
	}
}
