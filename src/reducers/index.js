import { combineReducers } from 'redux';

import GardenReducer from './reducer_garden';
import StatsReducer from './reducer_stats';

const rootReducer = combineReducers({
	garden: GardenReducer,
	stats: StatsReducer
});

export default rootReducer;