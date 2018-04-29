import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/';
import { 
    GAME_STYLE_DEFAULT,
    humanStart, 
    robotsStart 
} from '../constants';
import FoodLayer from './FoodLayer';
import Human from './Human';
import Robot from './Robot';
import Space from './Space';
import { obstructionsSet } from '../scenarios/';

const ROBOTS = [
    {
        startDelay: 1000,
        start: [0, 0],
        name: 'Rover'
    }
];

const getObstructions = {
    PURSUIT: spaces => {
        const noOfObstructions = 10;
        for (let i = 0; i < noOfObstructions; i++) {
            let ranX = Math.floor(Math.random() * spaces.length);
            let ranY = Math.floor(Math.random() * spaces[0].length);
            if (!spaces[ranX][ranY].isEdge) {
                spaces[ranX][ranY].occupant = 'OBSTRUCTION';
            }
        }
        return spaces;
    },
    PACMAN: spaces => {
        obstructionsSet.forEach((obstruction, index) => {
            spaces[obstruction[0]][obstruction[1]].occupant = 'OBSTRUCTION';
        });
        return spaces;
    }
}

class Board extends PureComponent {
	static propTypes = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
        boardSpaces: PropTypes.array.isRequired,
        gameStyle: PropTypes.string.isRequired
	}

	componentDidMount() {
        const { gameStyle } = this.props;
        this.isInGame = true;
        const boardSpaces = this.getSpaces(gameStyle === GAME_STYLE_DEFAULT);
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

	getSpaces = isStyledEdges => {
		const { gameStyle, width, height } = this.props;
        let spaces = [];
        let isEdge = false;
        // create 2d array of x/y spaces
        for (let x = 0; x < width; x++) {
            spaces[x] = [];
            for (let y = 0; y < height; y++) {
                isEdge = x === 0 || y === 0 || x === (width - 1) || y === (height - 1);
                spaces[x][y] = {
                    x: x,
                    y: y,
                    occupant: null,
                    isEdge: isStyledEdges && isEdge,
                };
            }
        }
        spaces = getObstructions[gameStyle](spaces);
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
        const { boardSpaces } = this.props;
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
                <Human />
                {ROBOTS.map((robot, index) =>
                    <Robot
                        key={robot.name}
                        index={index}
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
        gameStyle: state.gameStyle || GAME_STYLE_DEFAULT
    }
};

export default connect(mapStateToProps, {
    updateSimpleState
})(Board);
