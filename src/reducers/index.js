import { combineReducers } from 'redux';

import GardenReducer from './reducer_garden';

const rootReducer = combineReducers({
	garden: GardenReducer
});

export default rootReducer;