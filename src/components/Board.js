import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateBoard } from '../actions/actions_board';
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
	static propTypes = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
        endTheGame: PropTypes.func.isRequired,
        spaces: PropTypes.array.isRequired,
	}

	componentDidMount() {
        this.isInGame = true;
        const spaces = this.getSpaces();
        const freeSpaces = this.getFreeSpaces(spaces);

        this.props.updateBoard(spaces, 'UPDATE_SPACES');
        this.props.updateBoard(freeSpaces, 'UPDATE_FREE_SPACES');
	}

    componentWillUnmount() {
        this.isInGame = false;
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

    render() {
        const { spaces, endTheGame, currentFoods } = this.props;

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
                <FoodLayer currentFoods={currentFoods} />
            </div>
    	);
    }
}

const mapStateToProps = state => {
    return {
        spaces: state.board.spaces,
        currentFoods: state.board.currentFoods,
    }
};

export default connect(mapStateToProps, {
    updateBoard,
    // updateBoardState
})(Board);
