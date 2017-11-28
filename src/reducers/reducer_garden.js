import * as GardenActionTypes from '../actiontypes/actiontypes_garden';

const initialState = {
	spaces: [],
	spaceWidth: 72,
	human: {
		x: 9,
		y: 7
	}
}

export default function Timer(state=initialState, action) {

	switch (action.type) {
		case GardenActionTypes.UPDATE_SPACES:
			return {
				...state,
				spaces: action.data
			}

		case GardenActionTypes.UPDATE_HUMAN_POSITION:
			return {
				...state,
				human: action.data
			}

		case GardenActionTypes.UPDATE_ROBOT_POSITION:
			return {
				...state,
				robot: action.data
			}

		default:
			return state;
	}
}