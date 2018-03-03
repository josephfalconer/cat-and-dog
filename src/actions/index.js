import * as actionTypes from '../actiontypes/'

export const updateSimpleState = payload => {
	return {
		type: actionTypes.UPDATE_SIMPLE_STATE,
		payload
	}
}

export const updateRobotPosition = (index, x, y) => {
	return {
		type: actionTypes.UPDATE_ROBOT_POSITION,
		index,
		x,
		y,
	}
}