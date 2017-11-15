import * as GameActionTypes from '../actiontypes/actiontypes_game';

const initialState = {
	isInGame: false,
	isOpenShutters: false,
	isGameOver: false,
	message: '',
	shuttersMessage: 'Starting a new game...'
}

export default function Timer(state=initialState, action) {

	switch (action.type) {
		case GameActionTypes.UPDATE_GAME_STATUS:
			return {
				...state,
				isInGame: action.data
			}

		case GameActionTypes.OPEN_SHUTTERS:
			return {
				...state,
				isOpenShutters: action.data
			}

		case GameActionTypes.GAME_OVER:
			return {
				...state,
				isGameOver: action.data
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