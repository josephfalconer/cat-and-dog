import * as GardenActionTypes from '../actiontypes/actiontypes_garden';

export const setSpaces = spaces => {
	return {
		type: GardenActionTypes.SET_SPACES,
		spaces
	}
}
