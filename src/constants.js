export const STARTING_NEW_GAME_MESSAGE = 'Starting a new game...';
export const GETTING_STATS_MESSAGE = 'Getting game stats...';

export const humanStart = { x: 5, y: 4 }

export const robotsStart = [{x: 0, y: 0}]

export const GAME_STYLE_OPTIONS = [
	{
		name: 'PURSUIT_STYLE',
		displayName: 'Pursuit'
	},
	{
		name: 'PACMAN_STYLE',
		displayName: 'Pacman style'
	}
];

export const GAME_STYLE_DEFAULT = 'PURSUIT_STYLE';

export const boardInitialState = {
	boardSpaces: [],
	currentFoods: [],
	freeBoardSpaces: [],
	human: humanStart,
	robots: robotsStart,
}

export const inGameSwitches = {
	isInGame: true,
    isOpenShutters: true,
    isGameOver: false
}

export const endingSwitches = {
	...inGameSwitches,
    isGameOver: true
}

export const endedClosingSwitches = {
	...endingSwitches,
	isOpenShutters: false
}

export const endedClosedDestroyingSwitches = {
	...endedClosingSwitches,
	isInGame: false
}

export const gameInitialState = {
	difficulty: 600,
	endGameMessage: '',
	gameSwitches: {
		isInGame: false,
		isOpenShutters: false,
		isGameOver: false
	},
	isFirstGame: true,
	isShowingControls: true,
	shuttersMessage: STARTING_NEW_GAME_MESSAGE
}

export const statsInitialState = {
	isShowingStats: false,
	stats: {
		mealsEaten: 0,
		energy: 10,
		secondsRemaining: 60
	}
}
