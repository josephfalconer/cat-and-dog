import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
        this.updateBoard = bindActionCreators(updateBoard, props.dispatch);
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
        this.updateSpaces(SPACES);

        // set food after spaces ready
        setTimeout(this.setFood, 100);
        this.intervalID = setInterval(this.setFood, 10000);
	}

    componentWillUnmount() {
        this.isInGame = false;
        clearInterval(this.intervalID);
        this.updateBoard(null, 'RESET_START_POSITIONS');
    }

    updateSpaces = spaces => {
        if (this.isInGame) 
            this.setState({ ...this.state, spaces: spaces });
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

            let ranX = Math.floor(Math.random() * this.props.width), 
                ranY = Math.floor(Math.random() * this.props.height);

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
        if (!this.isInGame || this.props.gameSwitches.isGameOver) return;

        const { spaces } = this.state;

        for (var i = 0; i < this.noOfFood; i++) {

            let ran = Math.floor(Math.random() * this.freeSpaces.length),
                foodSpace = this.freeSpaces[ran];

            this.foodSpaces.push(foodSpace);

            spaces[foodSpace.x][foodSpace.y].occupant = 'FOOD';
            spaces[foodSpace.x][foodSpace.y].className = this.getFoodType();
        }

        this.updateSpaces(spaces);

        setTimeout(this.fadeFoods, 100);
        setTimeout(this.removeFoods, 5000);
    }

    fadeFoods = () => {
        if (!this.isInGame) return;
        
        const foodElements = document.getElementsByClassName('food');

        for (let i = 0; i < foodElements.length; i++) 
            foodElements[i].classList.add('fade');
    }

    removeFoods = () => {
        if (!this.isInGame) return;

        const { spaces } = this.state,
            { foodSpaces } = this;

        for (let i = 0; i < foodSpaces.length; i++) {
            spaces[foodSpaces[i].x][foodSpaces[i].y].occupant = false;
            spaces[foodSpaces[i].x][foodSpaces[i].y].className = null;
            this.updateSpaces(spaces);
        }
    }

    getFoodType = () => {
        const foods = [ 'fish', 'meat', 'steak', 'slice', 'drumstick', 'salami', 'sausage' ],
            ran = Math.floor(Math.random() * foods.length);

        return `food ${foods[ran]}`;
    }

    render() {
        const { spaces } = this.state,
            { endTheGame } = this.props;

    	return (
    		<div className="garden">
                {spaces && spaces.map((column, index) => {
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
                <Human spaces={spaces} endTheGame={endTheGame} />
                {ROBOTS.map((robot, index) => 
                    <Robot 
                        key={robot.name}
                        index={index}
                        spaces={spaces} 
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
        gameSwitches: state.game.switches,
        human: state.board.human
    }
);

export default connect(mapStateToProps)(Board);
