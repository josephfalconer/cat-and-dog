import * as TimerActionTypes from '../actiontypes/timer';

export const updateSecsRemaining = () => {
	return {
		type: TimerActionTypes.COUNT_DOWN
	}
};

export const resetTimer = () => {
	return {
		type: TimerActionTypes.RESET_TIMER,
	};
};