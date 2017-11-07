import * as CatActionTypes from '../actiontypes/cat';

const initialState = {
	energy: 10,
	mealsEaten: 0,
	timesStuck: 0,
	isStuck: false,
}

export default function Cat(state=initialState, action) {

	switch(action.type) {

		case CatActionTypes.UPDATE_ENERGY:

			if (action.decrement == 1) {
				return {
					...state,
					energy: state.energy + action.decrement,
					mealsEaten: state.mealsEaten + 1
				};

			} else {
				return {
					...state,
					energy: state.energy + action.decrement
				};
			}

		case CatActionTypes.FIX_CAT:
			return {
				...state,
				isStuck: true,
				timesStuck: state.timesStuck + 1
			}
			
		case CatActionTypes.FREE_CAT:
			return {
				...state,
				isStuck: false
			}

		case CatActionTypes.RESET_STATS:
			return {
				energy: action.newEnergy,
				mealsEaten: 0,
				timesStuck: 0,
				isStuck: false
			}

		default:
			return state;
	}
}