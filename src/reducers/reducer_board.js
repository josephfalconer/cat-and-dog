import * as BoardActionTypes from '../actiontypes/actiontypes_board';
import { humanStart, robotsStart } from '../constants';

const initialState = {
	freeSpaces: [],
	currentFoods: [],
	human: humanStart,
	robots: robotsStart,
	spaces: [],
}

export default function Board(state=initialState, action) {

	switch (action.type) {
		case BoardActionTypes.UPDATE_BOARD_STATE:
			const existingState = state;
			return Object.assign({}, existingState, action.payload);

		case BoardActionTypes.UPDATE_ROBOT_POSITION:
			const { payload } = action;
			let newRobotState = state;
			newRobotState.robots[payload[2]] = {x: payload[0], y: payload[1]};
			return newRobotState;

		default:
			return state;
	}
}