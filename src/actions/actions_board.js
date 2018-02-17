import * as BoardActionTypes from '../actiontypes/actiontypes_board';

export const updateBoardState = payload => {
	return {
		type: BoardActionTypes.UPDATE_BOARD_STATE,
		payload
	}
}

export const updateRobotPosition = payload => {
	return {
		type: BoardActionTypes.UPDATE_ROBOT_POSITION,
		payload
	}
}
