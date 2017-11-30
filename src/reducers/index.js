import { combineReducers } from 'redux';

import BoardReducer from './reducer_board';
import StatsReducer from './reducer_stats';
import GameReducer from './reducer_game';

const rootReducer = combineReducers({
	board: BoardReducer,
	stats: StatsReducer,
	game: GameReducer
});

export default rootReducer;