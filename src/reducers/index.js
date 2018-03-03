import { 
	boardInitialState,
	gameInitialState,
	statsInitialState
} from '../constants';
import * as actionTypes from '../actiontypes/';

const initialState = {
	...boardInitialState,
	...gameInitialState,
	...statsInitialState
}

function simpleReducer(state=initialState, action) {
	switch (action.type) {
		case actionTypes.UPDATE_SIMPLE_STATE: {
			return {
				...state,
				...action.payload
			}
		}
		case actionTypes.UPDATE_ROBOT_POSITION: {
			let newRobotsState = state.robots;
			newRobotsState[action.index] = {x: action.x, y: action.y};
			return {
				...state,
				robots: newRobotsState
			}
		}
		default:
			return state;
	}
}

export default simpleReducer;
