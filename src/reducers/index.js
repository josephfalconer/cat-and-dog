import { combineReducers } from 'redux';

import ShuttersReducer from './reducer_shutters';
import CatReducer from './reducer_cat';
import TimerReducer from './reducer_timer';

const rootReducer = combineReducers({
	shutters: ShuttersReducer,
	cat: CatReducer,
	timer: TimerReducer
});

export default rootReducer;