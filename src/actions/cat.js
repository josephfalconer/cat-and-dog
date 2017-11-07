import * as CatActionTypes from '../actiontypes/cat';

export const updateEnergy = decrement => {
	return {
		type: CatActionTypes.UPDATE_ENERGY,
		decrement
	}
}

export const fixCat = () => {
	return {
		type: CatActionTypes.FIX_CAT,
	}
}

export const freeCat = () => {
	return {
		type: CatActionTypes.FREE_CAT,
	}
}

export const resetStats = () => {
	return {
		type: CatActionTypes.RESET_STATS,
		newEnergy: 10
	}
}