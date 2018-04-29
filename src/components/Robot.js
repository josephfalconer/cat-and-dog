import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/';
import * as helpers from '../helpers';
import Player from './Player';

class Robot extends Player {
    constructor(props) {
        super(props);
        this.isBlocked = false;
        this.name = 'ROBOT';
        this.isDoneTwoBlockedMoves = false;
        this.index = props.index;
    }

    static propTypes = {
        currentFoods: PropTypes.array.isRequired,
        index: PropTypes.number.isRequired,
        gameSwitches: PropTypes.object.isRequired,
        delay: PropTypes.number.isRequired,
        human: PropTypes.object.isRequired,
        boardSpaces: PropTypes.array.isRequired,
        start: PropTypes.array.isRequired
    }

    state = {
        style: helpers.writeTransform(9, 7),
        face: 'RIGHT'
    }

    componentDidMount() {
        const { start, delay } = this.props;

        this.moveForward(start[0], start[1], 'RIGHT');
        this.isInGame = true;

        // set movement interval
        this.intervalID = setInterval(this.findPath, delay);
    }

    componentWillUnmount() {
    	// clear movement interval
        this.isInGame = false;
    	clearInterval(this.intervalID);
    }

    findPath = () => {
        if (!this.isInGame || this.props.gameSwitches.isGameOver) {
            return;
        }

        if (this.isBlocked) {
            this.isDoneTwoBlockedMoves = false;
            this.doBlockedMove('LEFT');

        } else {
            this.doNormalMove();
        }
    }

    doBlockedMove = direction => {
        const { x, y, face } = this.state;
        const newFace = direction === 'LEFT' ? this.getLeft(face) : this.getRight(face);
        const validXY = this.checkMove(x, y, newFace);

        this.turn(newFace);

        if (!validXY) {
            this.isBlocked = true;
            return;
        }

        this.isBlocked = false;
        this.moveRobotForward(validXY, newFace);

        // prevent infinite setTimeout
        if (!this.isDoneTwoBlockedMoves) {
            setTimeout(() => {
                this.isDoneTwoBlockedMoves = true;
                this.doBlockedMove('RIGHT');
            }, this.props.delay / 2);
        }
    }

    doNormalMove = () => {
        // if human's x position is different to robot's x position
        if (this.props.human.x !== this.state.x) {
            // pursue on x axis
            this.isBlocked = this.pursueHuman('x');
        }

        setTimeout(() => {
            if (!this.isInGame) {
                return;
            }
            // if human's y position is different to robot's y position
            if (this.props.human.y !== this.state.y)
                // pursue on y axis
                this.isBlocked = this.pursueHuman('y');
        }, this.props.delay / 2);
    }

    pursueHuman = axis => {
        const { x, y } = this.state;
        const newDirection = axis === 'x' ? this.checkHumanPositionX(x) : this.checkHumanPositionY(y);
        const validXY = this.checkMove(x, y, newDirection);

        // turn robot whether can move or not
        if (this.isInGame)
            this.turn(newDirection);

        if (validXY) {
            this.moveRobotForward(validXY, newDirection);
            return false;
        }
        return true;
    }

    checkHumanPositionX = x => {
        return this.props.human.x > x ? 'RIGHT' : 'LEFT';
    }

    checkHumanPositionY = y => {
        return this.props.human.y > y ? 'DOWN' : 'UP';
    }

    turn = direction => {
        if (this.isInGame) {
            this.setState({ ...this.state, face: direction });
        }
    }

    moveRobotForward = (nextSpace, face) => {
        const { x, y } = nextSpace;
        const { human, updateRobotPosition } = this.props;

        if (x === human.x && y === human.y) {
            actions.endTheGame('A dog caught you!');
            return;
        }
        updateRobotPosition(this.index, x, y);
        this.moveForward(x, y, face);
    }

    getLeft = face => {
        const lefts = {
            UP: 'LEFT',
            RIGHT: 'UP',
            DOWN: 'RIGHT',
            LEFT: 'DOWN'
        }
        return lefts[face];
    }

    getRight = face => {
        const rights = {
            UP: 'RIGHT',
            RIGHT: 'DOWN',
            DOWN: 'LEFT',
            LEFT: 'UP'
        }
        return rights[face];
    }

    render() {
    	const { style, face } = this.state;
        const className = `dog dog-${face.toLowerCase()}`;
    	style.backgroundSize = '95%';
    	return (
	        <span className={className} style={style}></span>
	    )
    }
}

const mapStateToProps = state => (
    {
        currentFoods: state.currentFoods,
        boardSpaces: state.boardSpaces,
        gameSwitches: state.gameSwitches,
        delay: state.difficulty,
        human: state.human,
        sampleSpaceWidth: state.sampleSpaceWidth
    }
);

export default connect(mapStateToProps, {
    updateRobotPosition: actions.updateRobotPosition,
    updateSimpleState: actions.updateSimpleState
})(Robot);
