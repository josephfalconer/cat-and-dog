// eslint-disable-next-line
import { dispatch } from 'redux';

import { store } from '../';
import * as actionTypes from '../actiontypes/'
import { 
	endingSwitches,
	endedClosingSwitches,
	endedClosedDestroyingSwitches,
	GETTING_STATS_MESSAGE, 
} from '../constants';

export function updateSimpleState(payload) {
	return {
		type: actionTypes.UPDATE_SIMPLE_STATE,
		payload
	}
}

export function updateRobotPosition(index, x, y) {
	return {
		type: actionTypes.UPDATE_ROBOT_POSITION,
		index,
		x,
		y,
	}
}

export function endTheGame(message) {
    // freeze game, display reason, change bg colour
    store.dispatch(updateSimpleState({
        gameSwitches: {
        	...endingSwitches
        },
        endGameMessage: message,
        shuttersMessage: GETTING_STATS_MESSAGE,
        isFirstGame: false
    }));

    // close shutters after time to read reason
    setTimeout(() => {
        store.dispatch(updateSimpleState({
            gameSwitches: {
                ...endedClosingSwitches
            }
        }));
    }, 3000);

    // destroy board and live info
    // show stats when shutters complete transition
    setTimeout(() => {
        store.dispatch(updateSimpleState({
            gameSwitches: {
                ...endedClosedDestroyingSwitches
            },
            isShowingStats: true,
        }));
    }, 4000);

    // open shutters
    setTimeout(() => {
        store.dispatch(updateSimpleState({
            gameSwitches: {
                ...endedClosedDestroyingSwitches,
                isOpenShutters: true
            }
        }));
        // controls show after shutters complete transition
        setTimeout(() => store.dispatch(updateSimpleState({isShowingControls: true})), 1000);
    }, 5000);
}
