import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as helpers from '../actions/helpers';
import Player from './Player';


class Robot extends Player {

    constructor(props) {
        super(props);
        this.isStuck = false;
        this.name = 'ROBOT';
        this.delay = props.delay;
        this.endTheGame = props.endTheGame;
        this.updateSpaces = props.updateSpaces;
    }

    static propTypes = {
        gameSwitches: PropTypes.object.isRequired,
        delay: PropTypes.number.isRequired,
        human: PropTypes.object.isRequired,
        endTheGame: PropTypes.func.isRequired,
        spaces: PropTypes.array.isRequired,
        updateSpaces: PropTypes.func.isRequired
    }

    state = {
        style: helpers.writeTransform(9, 7),
        face: 'RIGHT'
    }

    componentDidMount() {
        this.moveForward(0, 0, 'RIGHT');
        this.isInGame = true;

        // set movement interval
        this.intervalID = setInterval(this.findPath, this.delay);
    }

    componentWillUnmount() {
    	// clear movement interval
        this.isInGame = false;
    	clearInterval(this.intervalID);
    }

    findPath = () => {
        if (!this.isInGame || this.props.gameSwitches.isGameOver) return;

        if (this.isStuck) {
            this.getRoundObstacle();
                
        } else {
            this.pursueHuman();
        }
    }

    getRoundObstacle = () => {
        const { x, y, face } = this.state,
            newLeft = this.getLeft(face),
            validXY = this.checkMove(x, y, newLeft);

        this.turn(newLeft);

        if (validXY) {
            this.moveRobotForward(validXY, newLeft);
            this.isStuck = false;

            // attempt second movement to the right
            setTimeout(() => {
                if (this.isInGame) this.moveRobotRight(newLeft);
            }, this.delay / 2);
        }
    }

    pursueHuman = () => {
        // move on x axis
        if (this.props.human.x !== this.state.x) 
            this.isStuck = this.attemptStep('x');

        setTimeout(() => {
            if (!this.isInGame) return;

            // then y axis - with fresh data
            if (this.props.human.y !== this.state.y) 
                this.isStuck = this.attemptStep('y');

        }, this.delay / 2);
    }

    attemptStep = axis => {
        const { x, y } = this.state,
            newDirection = axis === 'x' ? this.getFaceX(x) : this.getFaceY(y),
            validXY = this.checkMove(x, y, newDirection);

        if (this.isInGame)
            this.turn(newDirection);

        if (validXY) {
            this.moveRobotForward(validXY, newDirection);
            return false;
        }

        return true;
    }

    getFaceX = x => {
        return this.props.human.x > x ? 'RIGHT' : 'LEFT';
    }

    getFaceY = y => {
        return this.props.human.y > y ? 'DOWN' : 'UP';
    }

    turn = direction => {
        if (this.isInGame)
            this.setState({ ...this.state, face: direction });
    }

    moveRobotForward = (nextSpace, face) => {
        const { x, y, occupant } = nextSpace;
        let updatedSpaces;

        if (occupant === 'HUMAN') {
            this.endTheGame('The dog caught you!');
            
        } else {
            updatedSpaces = this.moveForward(x, y, face);
            this.updateSpaces(updatedSpaces);
        }
    }

    moveRobotRight = currentFace => {
        const newRight = this.getRight(currentFace),
            validXY = this.checkMove(this.state.x, this.state.y, newRight);

        this.turn(newRight);

        if (validXY) {
            this.moveRobotForward(validXY, newRight);
        } else {
            this.isStuck = true;
        }
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
    	const { style, face } = this.state,
            className = `dog dog-${face.toLowerCase()}`;

    	style.backgroundSize = '95%';

    	return (
	        <span className={className} style={style}></span>
	    )
    }
}

const mapStateToProps = state => (
    {
        gameSwitches: state.game.switches,
        delay: state.game.difficulty,
        human: state.board.human,
    }
);

export default connect(mapStateToProps)(Robot);
