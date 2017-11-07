import * as TimerActionTypes from '../actiontypes/timer';

const initialState = {
	secsRemaining: 60
}

export default function Timer(state=initialState, action) {

	switch (action.type) {
		case TimerActionTypes.COUNT_DOWN:
			return {
				secsRemaining: state.secsRemaining - 1
			};

		case TimerActionTypes.RESET_TIMER: 
			return {
				secsRemaining: 60
			};

		default:
			return state;
	}
}