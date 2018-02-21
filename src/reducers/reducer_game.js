import * as GameActionTypes from '../actiontypes/actiontypes_game';

const initialState = {
	switches: {
		isInGame: false,
		isOpenShutters: false,
		isGameOver: false
	},
	difficulty: 600,
	message: '',
	shuttersMessage: 'Starting a new game...'
}

export default function Game(state=initialState, action) {

	switch (action.type) {
		case GameActionTypes.UPDATE_GAME_STATE:
			const existingState = state;
			return Object.assign({}, existingState, action.payload);

		case GameActionTypes.HIT_GAME_SWITCHES:
			return {
				...state,
				switches: action.data
			}

		case GameActionTypes.UPDATE_DIFFICULTY:
			return {
				...state,
				difficulty: action.data
			}

		case GameActionTypes.UPDATE_MESSAGE:
			return {
				...state,
				message: action.data
			}

		case GameActionTypes.UPDATE_SHUTTERS_MESSAGE:
			return {
				...state,
				shuttersMessage: action.data
			}

		default:
			return state;
	}
}