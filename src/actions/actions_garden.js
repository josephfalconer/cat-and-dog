import * as GardenActionTypes from '../actiontypes/actiontypes_garden';

export const updateGarden = (data, type) => {
	return {
		type: GardenActionTypes[type],
		data
	}
}
