import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/';
import { humanStart, robotsStart } from '../constants';
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
        boardSpaces: PropTypes.array.isRequired,
	}

	componentDidMount() {
        this.isInGame = true;
        const boardSpaces = this.getSpaces();
        const freeBoardSpaces = this.getFreeSpaces(boardSpaces);

        this.props.updateSimpleState({
            boardSpaces,
            freeBoardSpaces
        });
	}

    componentWillUnmount() {
        this.isInGame = false;
        this.props.updateSimpleState({
            human: humanStart,
            robots: robotsStart
        });
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
                    occupant: null,
                    isEdge: x === 0 || y === 0 || x === (width - 1) || y === (height - 1),
                };
            }
        }
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
        let allSpaces = [];
        spaces.forEach(column => {
            column.forEach(space => {
                allSpaces.push(space);
            });
        });
        return allSpaces.filter(space => !space.occupant);
    }

    render() {
        const { boardSpaces, endTheGame } = this.props;
    	return (
    		<div className="garden">
                {boardSpaces.length && boardSpaces.map((column, index) => {
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
        boardSpaces: state.boardSpaces,
    }
};

export default connect(mapStateToProps, {
    updateSimpleState
})(Board);
