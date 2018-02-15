import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateBoard } from '../actions/actions_board';
import Human from './Human';
import Robot from './Robot';
import Space from './Space';

const ROBOTS = [
    {
        startDelay: 1000,
        start: [0, 0],
        name: 'Rover'
    }
]

class Board extends Component {
    constructor(props) {
        super(props);
        this.foodSpaces = [];
        this.noOfFood = 5;
    }

	static propTypes = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
        endTheGame: PropTypes.func.isRequired,
        gameSwitches: PropTypes.object.isRequired
	}

    state = {
        spaces: []
    }

	componentDidMount() {
        this.isInGame = true;

        // lay out spaces with obstructions
        let SPACES = this.layoutSpaces();
        SPACES = this.setObstructions(SPACES);
        this.freeSpaces = this.updateFreeSpaces(SPACES);
        this.props.updateBoard(SPACES, 'UPDATE_SPACES');

        // set food after spaces ready
        setTimeout(this.setFood, 100);
        this.intervalID = setInterval(this.setFood, 10000);
	}

    componentWillUnmount() {
        this.isInGame = false;
        clearInterval(this.intervalID);
        this.props.updateBoard(null, 'RESET_START_POSITIONS');
    }

	layoutSpaces = () => {
		const { width, height } = this.props;
        let SPACES = [];

        // create 2d array of x/y spaces
        for (let x = 0; x < width; x++) {
            SPACES[x] = [];
            for (let y = 0; y < height; y++) {
                SPACES[x][y] = {
                    x: x,
                    y: y,
                    occupant: false,
                    isEdge: x === 0 || y === 0 || x === (width - 1) || y === (height - 1),
                    className: null
                };
            }
        }

        SPACES[width - 1][height - 1].occupant = 'HUMAN';
        SPACES[0][0].occupant = 'ROBOT';
        return SPACES;
	}

    setObstructions = spaces => {
        const noOfObstructions = 10;

        for (let i = 0; i < noOfObstructions; i++) {
            let ranX = Math.floor(Math.random() * this.props.width);
            let ranY = Math.floor(Math.random() * this.props.height);

            if (!spaces[ranX][ranY].isEdge) {
                spaces[ranX][ranY].occupant = 'OBSTRUCTION';
            }
        }
        return spaces;
    }

    updateFreeSpaces = spaces => {
        let freeSpaces = [];

        for (let x = 0; x < spaces.length; x++) {
            for (let y = 0; y < spaces[x].length; y++) {
                if (!spaces[x][y].occupant) {
                    freeSpaces.push({ x: x, y: y });
                }
            }
        }
        return freeSpaces
    }

    setFood = () => {
        const { spaces } = this.props;

        if (!this.isInGame || this.props.gameSwitches.isGameOver || !spaces.length) {
            return;
        }

        for (var i = 0; i < this.noOfFood; i++) {
            let ran = Math.floor(Math.random() * this.freeSpaces.length);
            let foodSpace = this.freeSpaces[ran];
            this.foodSpaces.push(foodSpace);
            spaces[foodSpace.x][foodSpace.y].occupant = 'FOOD';
            spaces[foodSpace.x][foodSpace.y].className = this.getFoodType();
        }

        this.props.updateBoard(spaces, 'UPDATE_SPACES');
        setTimeout(this.fadeFoods, 100);
        setTimeout(this.removeFoods, 5000);
    }

    fadeFoods = () => {
        if (!this.isInGame) {
            return;
        }

        const foodElements = document.getElementsByClassName('food');

        for (let i = 0; i < foodElements.length; i++) {
            foodElements[i].classList.add('fade');
        }
    }

    removeFoods = () => {
        if (!this.isInGame) {
            return;
        }

        const { spaces } = this.props;
        const { foodSpaces } = this;

        for (let i = 0; i < foodSpaces.length; i++) {
            spaces[foodSpaces[i].x][foodSpaces[i].y].occupant = false;
            spaces[foodSpaces[i].x][foodSpaces[i].y].className = null;
            this.props.updateBoard(spaces, 'UPDATE_SPACES');
        }
    }

    getFoodType = () => {
        const foods = [ 'fish', 'meat', 'steak', 'slice', 'drumstick', 'salami', 'sausage' ];
        const ran = Math.floor(Math.random() * foods.length);
        return `food ${foods[ran]}`;
    }

    render() {
        const { spaces, endTheGame } = this.props;
    	return (
    		<div className="garden">
                {spaces.length && spaces.map((column, index) => {
                    return (
                        <div className="garden__column" key={index}>
                            {column.map((space, index) => {
                                return (
                                    <Space
                                        key={index}
                                        data={space}
                                    />
                                )
                            })}
                        </div>
                    );
                })}
                <Human endTheGame={endTheGame} />
                {ROBOTS.map((robot, index) =>
                    <Robot
                        key={robot.name}
                        index={index}
                        endTheGame={this.props.endTheGame}
                        start={robot.start}
                        uniqueName={robot.name}
                        startDelay={robot.startDelay}
                    />
                )}
            </div>
    	);
    }
}

const mapStateToProps = state => (
    {
        spaces: state.board.spaces,
        gameSwitches: state.game.switches,
        human: state.board.human
    }
);

export default connect(mapStateToProps, {
    updateBoard
})(Board);
