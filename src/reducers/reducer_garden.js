import * as GardenActionTypes from '../actiontypes/actiontypes_garden';

const initialState = {
	spaces: []
}

export default function Timer(state=initialState, action) {

	switch (action.type) {
		case GardenActionTypes.SET_SPACES:
			return {
				...state,
				spaces: action.data
			}

		case GardenActionTypes.UPDATE_CAT_POSITION:
			return {
				...state,
				cat: action.data
			}

		case GardenActionTypes.UPDATE_DOG_POSITION:
			return {
				...state,
				dog: action.data
			}

		default:
			return state;
	}
}