import * as BoardActionTypes from '../actiontypes/actiontypes_board';

export const robotsStart = [{x: 0, y: 0}]

const humanStart = { x: 5, y: 4 }

const initialState = {
	spaces: [],
	human: humanStart,
	robots: robotsStart
}

export default function Board(state=initialState, action) {

	switch (action.type) {
		case BoardActionTypes.UPDATE_SPACES:
			console.log('reducer', action.data);
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
			let newState = state;
			newState.robots[action.data[2]] = {x: action.data[0], y: action.data[1]};
			return newState;

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