import * as BoardActionTypes from '../actiontypes/actiontypes_board';

export const robotsStart = [{x: 0, y: 0}]

const humanStart = { x: 5, y: 4 }

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
			return Object.assign({}, state, action.payload);


		case BoardActionTypes.UPDATE_SPACES:
			return {
				...state,
				spaces: action.data
			}

		case BoardActionTypes.UPDATE_HUMAN_POSITION:
			return {
				...state,
				human: action.data
			}

		case BoardActionTypes.UPDATE_ROBOT_POSITION:
			let newRobotState = state;
			newRobotState.robots[action.data[2]] = {x: action.data[0], y: action.data[1]};
			return newRobotState;

		case BoardActionTypes.RESET_START_POSITIONS:
			return {
				...state,
				robots: robotsStart,
				human: humanStart
			};


		default:
			return state;
	}
}