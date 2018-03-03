export const STARTING_NEW_GAME_MESSAGE = 'Starting a new game...';
export const GETTING_STATS_MESSAGE = 'Getting game stats...';

export const humanStart = { x: 5, y: 4 }

export const robotsStart = [{x: 0, y: 0}]

export const boardInitialState = {
	boardSpaces: [],
	currentFoods: [],
	freeBoardSpaces: [],
	human: humanStart,
	robots: robotsStart,
}

export const gameInitialState = {
	difficulty: 600,
	gameSwitches: {
		isInGame: false,
		isOpenShutters: false,
		isGameOver: false
	},
	endGameMessage: '',
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
