import * as GardenActionTypes from '../actiontypes/actiontypes_garden';

const initialState = {
	spaces: []
}

export default function Timer(state=initialState, action) {

	switch (action.type) {
		case GardenActionTypes.SET_SPACES:
			return {
				spaces: action.spaces
			}

		default:
			return state;
	}
}