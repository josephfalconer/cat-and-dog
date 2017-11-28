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
    }

    static propTypes = {
        gameSwitches: PropTypes.object.isRequired,
        delay: PropTypes.number.isRequired,
        human: PropTypes.object.isRequired,
        spaceWidth: PropTypes.number.isRequired,
        endTheGame: PropTypes.func.isRequired
    }

    state = {
        style: helpers.writeTransform(),
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

    pursueHuman = () => {

        // move on x axis
        if (this.props.human.x !== this.state.x) 
            this.isStuck = this.attemptStep('x');

        setTimeout(() => {
            if (!this.isInGame)
                return;

            // then y axis - with fresh data
            if (this.props.human.y !== this.state.y) 
                this.isStuck = this.attemptStep('y');

        }, this.delay / 2);
    }

    getRoundObstacle = () => {
        const { x, y, face } = this.state,
            { spaces } = this.props,
            newLeft = this.getLeft(face),
            validXY = this.checkMove(x, y, newLeft, spaces);

        this.turn(newLeft);

        if (validXY) {
            this.moveRobotForward(validXY, newLeft);
            this.isStuck = false;

            setTimeout(() => {
                if (!this.isInGame)
                    return;

                const { x, y } = this.state,
                    { spaces } = this.props,
                    newRight = this.getRight(newLeft),
                    validXY = this.checkMove(x, y, newRight, spaces);

                this.turn(newRight);

                if (validXY) {
                    this.moveRobotForward(validXY, newRight);
                } else {
                    this.isStuck = true;
                }
            }, this.delay / 2);
        }
    }

    moveRobotForward = (nextSpace, face) => {
        const { x, y, occupant } = nextSpace,
            { updateSpaces, endTheGame } = this.props;

        if (occupant === 'HUMAN') {
            endTheGame('The dog caught you!');
            
        } else {
            const updatedSpaces = this.moveForward(x, y, face);
            updateSpaces(updatedSpaces);
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

    turn = direction => {
        if (this.isInGame)
            this.setState({ ...this.state, face: direction });
    }

    attemptStep = axis => {
        const { x, y } = this.state,
            { spaces } = this.props,
            newDirection = axis === 'x' ? this.askX(x) : this.askY(y),
            validXY = this.checkMove(x, y, newDirection, spaces);

        if (this.isInGame)
            this.setState({ ...this.state, face: newDirection });

        if (validXY) {
            this.moveRobotForward(validXY, newDirection);
            return false;
        }

        return true;
    }

    askX = x => {
        return this.props.human.x > x ? 'RIGHT' : 'LEFT';
    }

    askY = y => {
        return this.props.human.y > y ? 'DOWN' : 'UP';
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
        human: state.garden.human,
        spaceWidth: state.garden.spaceWidth
    }
);

export default connect(mapStateToProps)(Robot);
