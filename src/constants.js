export const STARTING_NEW_GAME_MESSAGE = 'Starting a new game...';
export const GETTING_STATS_MESSAGE = 'Getting game stats...';

export const HUMAN_START = { x: 5, y: 4 }

export const HUMAN_START_POSITIONS = {
  PURSUIT_STYLE: {
    x: 9,
    y: 7
  },
  PACMAN_STYLE: {
    x: 5,
    y: 4
  }
}

export const ROBOT_START = [
	{x: 0, y: 0},
	{x: 0, y: 7},
	{x: 9, y: 0},
	{x: 9, y: 7}
]

export const ROBOTS = [
  {
    startDelay: 1000,
    start: {
      x: 0,
      y: 0
    },
    name: 'Rover'
  },
  {
    startDelay: 2000,
    start: {
      x: 0,
      y: 7
    },
    name: 'Spot'
  },
  {
    startDelay: 3000,
    start: {
      x: 9,
      y: 0
    },
    name: 'Pixie'
    },
  {
    startDelay: 4000,
    start: {
      x: 9,
      y: 7
    },
    name: 'Angel'
  }
]

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

export const BOARD_INITIAL_STATE = {
	boardSpaces: [],
	currentFoods: [],
	freeBoardSpaces: [],
	human: HUMAN_START,
	robots: ROBOT_START,
}

export const IN_GAME_SWITCHES = {
	isInGame: true,
    isOpenShutters: true,
    isGameOver: false
}

export const ENDING_SWITCHES = {
	...IN_GAME_SWITCHES,
    isGameOver: true
}

export const ENDED_CLOSING_SWITCHES = {
	...ENDING_SWITCHES,
	isOpenShutters: false
}

export const ENDED_CLOSED_DESTROYING_SWITCHES = {
	...ENDED_CLOSING_SWITCHES,
	isInGame: false
}

export const GAME_INITIAL_STATE = {
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

export const STATS_INITIAL_STATE = {
	isShowingStats: false,
	stats: {
		mealsEaten: 0,
		energy: 10,
		secondsRemaining: 60
	}
}

export const HINTS = [
  { hint: "Get the yummy food.", className: "get-food" },
  { hint: "If you get too tired it's game over.", className: "too-tired" },
  { hint: "If your stamina gets to 12 or more, you'll be stuck with indigestion until your stamina gets back down to 10.", className: "too-big" },
  { hint: "Watch out for the dog - Not only does he chase your fluffy self, but he eats the food too.", className: "avoid-dog" },
  { hint: "Hit the \u2190 \u2191 \u2192 \u2193 keys on your keyboard to move. On mobile your screen is the button pad, tap it to move.", className: "move-cat" },
  { hint: "Try to last for 60 seconds!", className: 'time-limit' },
  { hint: "Ready?", className: 'get-ready' }
];

export const LEFTS = {
  UP: 'LEFT',
  RIGHT: 'UP',
  DOWN: 'RIGHT',
  LEFT: 'DOWN'
}

export const RIGHTS = {
  UP: 'RIGHT',
  RIGHT: 'DOWN',
  DOWN: 'LEFT',
  LEFT: 'UP'
}
