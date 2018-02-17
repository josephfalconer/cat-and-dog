import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateBoard, updateBoardState } from '../actions/actions_board';
import FoodLayer from './FoodLayer';
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
    // constructor(props) {
    //     super(props);
    //     this.foodSpaces = [];
    //     this.noOfFood = 5;
    // }

	static propTypes = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
        endTheGame: PropTypes.func.isRequired,
        gameSwitches: PropTypes.object.isRequired
	}

	componentDidMount() {
        this.isInGame = true;
        const spaces = this.getSpaces();
        const freeSpaces = this.getFreeSpaces(spaces);

        this.props.updateBoardState({
            spaces,
            freeSpaces
        });
        // this.props.updateBoardState('spaces', spaces);
	}

    componentWillUnmount() {
        this.isInGame = false;
        // clearInterval(this.intervalID);
        this.props.updateBoard(null, 'RESET_START_POSITIONS');
    }

	getSpaces = () => {
		const { width, height } = this.props;
        let spaces = [];

        // create 2d array of x/y spaces
        for (let x = 0; x < width; x++) {
            spaces[x] = [];
            for (let y = 0; y < height; y++) {
                spaces[x][y] = {
                    x: x,
                    y: y,
                    occupant: false,
                    isEdge: x === 0 || y === 0 || x === (width - 1) || y === (height - 1),
                    className: null
                };
            }
        }

        spaces[width - 1][height - 1].occupant = 'HUMAN';
        spaces[0][0].occupant = 'ROBOT';
        // add obstructions
        spaces = this.setObstructions(spaces);
        return spaces;
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

    getFreeSpaces = spaces => {
        let freeSpaces = [];

        for (let x = 0; x < spaces.length; x++) {
            for (let y = 0; y < spaces[x].length; y++) {
                if (!spaces[x][y].occupant) {
                    freeSpaces.push([x, y]);
                }
            }
        }
        return freeSpaces
    }

    // setFood = () => {
    //     const { spaces } = this.props;

    //     if (!this.isInGame || this.props.gameSwitches.isGameOver || !spaces.length) {
    //         return;
    //     }

    //     for (var i = 0; i < this.noOfFood; i++) {
    //         let ran = Math.floor(Math.random() * this.freeSpaces.length);
    //         let foodSpace = this.freeSpaces[ran];
    //         this.foodSpaces.push(foodSpace);
    //         spaces[foodSpace.x][foodSpace.y].occupant = 'FOOD';
    //         spaces[foodSpace.x][foodSpace.y].className = this.getFoodType();
    //     }

    //     this.props.updateBoardState({spaces: spaces});
    //     setTimeout(this.fadeFoods, 100);
    //     setTimeout(this.removeFoods, 5000);
    // }

    // fadeFoods = () => {
    //     if (!this.isInGame) {
    //         return;
    //     }

    //     const foodElements = document.getElementsByClassName('food');

    //     for (let i = 0; i < foodElements.length; i++) {
    //         foodElements[i].classList.add('fade');
    //     }
    // }

    // removeFoods = () => {
    //     if (!this.isInGame) {
    //         return;
    //     }

    //     const { spaces } = this.props;
    //     const { foodSpaces } = this;

    //     for (let i = 0; i < foodSpaces.length; i++) {
    //         spaces[foodSpaces[i].x][foodSpaces[i].y].occupant = false;
    //         spaces[foodSpaces[i].x][foodSpaces[i].y].className = null;
    //         this.props.updateBoardState({spaces: spaces});
    //     }
    // }

    // getFoodType = () => {
    //     const foods = [ 'fish', 'meat', 'steak', 'slice', 'drumstick', 'salami', 'sausage' ];
    //     const ran = Math.floor(Math.random() * foods.length);
    //     return `food ${foods[ran]}`;
    // }

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
                <FoodLayer />
            </div>
    	);
    }
}

const mapStateToProps = state => {
    return {
        spaces: state.board.spaces,
        gameSwitches: state.game.switches,
        human: state.board.human
    }
};

export default connect(mapStateToProps, {
    updateBoard,
    updateBoardState
})(Board);
