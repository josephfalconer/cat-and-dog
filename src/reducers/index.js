import { combineReducers } from 'redux';

import GardenReducer from './reducer_garden';
import StatsReducer from './reducer_stats';
import GameReducer from './reducer_game';

const rootReducer = combineReducers({
	garden: GardenReducer,
	stats: StatsReducer,
	game: GameReducer
});

export default rootReducer;