import * as BoardActionTypes from '../actiontypes/actiontypes_board';

const initialState = {
	spaces: [],
	human: {
		x: 9,
		y: 7
	}
}

export default function Timer(state=initialState, action) {

	switch (action.type) {
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
			return {
				...state,
				robot: action.data
			}

		default:
			return state;
	}
}