import {
  BOARD_INITIAL_STATE,
  GAME_INITIAL_STATE,
  STATS_INITIAL_STATE
} from '../constants';
import * as actionTypes from '../actiontypes/';

const INITIAL_STATE = {
  ...BOARD_INITIAL_STATE,
  ...GAME_INITIAL_STATE,
  ...STATS_INITIAL_STATE
}

function simpleReducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SIMPLE_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case actionTypes.UPDATE_ROBOT_POSITION: {
      let newRobotsState = state.robots;
      newRobotsState[action.index] = {
        ...newRobotsState[action.index],
        ...action.payload
      }
      return {
        ...state,
        robots: newRobotsState
      }
    }
    default:
      return state;
  }
}

export default simpleReducer;
