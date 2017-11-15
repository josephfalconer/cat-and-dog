import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GameActionCreators from '../actions/actions_game';
import * as helpers from '../actions/helpers';
import Creature from './Creature';


class Dog extends Creature {

    constructor(props) {
        super(props);
        this.actionType = 'UPDATE_DOG_POSITION';
        this.isStuck = false;
        this.name = 'DOG';
    }

    state = {
        style: helpers.writeTransform(),
        face: 'right'
    }

    componentDidMount() {
        this.moveForward(0, 0, 'right');
        this.isInGame = true;

        // set movement interval
        this.intervalID = setInterval(this.findPath, 1000);
    }

    componentWillUnmount() {
    	// clear movement interval
        this.isInGame = false;
    	clearInterval(this.intervalID);
    }

    findPath = () => {
        if (!this.isInGame)
            return;

        if (this.isStuck) {
            this.getRoundObstacle();
                
        } else {
            this.pursueCat();
        }
    }

    pursueCat = () => {

        // move on x axis
        if (this.props.cat.x !== this.state.x) 
            this.isStuck = this.attemptStep('x');

        setTimeout(() => {
            if (!this.isInGame)
                return;

            // then y axis - with fresh data
            if (this.props.cat.y !== this.state.y) 
                this.isStuck = this.attemptStep('y');

        }, 500);
    }

    getRoundObstacle = () => {
        const { x, y, face } = this.state,
            { spaces } = this.props,
            newLeft = this.getLeft(face),
            validXY = this.checkMove(x, y, newLeft, spaces);

        this.turn(newLeft);

        if (validXY) {
            this.moveDogForward(validXY, newLeft);
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
                    this.moveDogForward(validXY, newRight);
                } else {
                    this.isStuck = true;
                }
            }, 500);
        }
    }

    moveDogForward = (nextSpace, face) => {
        const { x, y, occupant } = nextSpace,
            { dispatch } = this.props,
            updateGame = bindActionCreators(GameActionCreators.updateGame, dispatch)

        if (occupant === 'CAT') {
            console.log('Found the cat!');
            // updateGame(false, 'UPDATE_GAME_STATUS');

        } else {
            const updatedSpaces = this.moveForward(x, y, face);
            this.props.updateSpaces(updatedSpaces);
        }
    }

    getLeft = face => {
        const lefts = {
            up: 'left',
            right: 'up',
            down: 'right',
            left: 'down'
        }

        return lefts[face];
    }

    getRight = face => {
        const rights = {
            up: 'right',
            right: 'down',
            down: 'left',
            left: 'up'
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
            this.moveDogForward(validXY, newDirection);
            return false;
        }

        return true;
    }

    askX = x => {
        return this.props.cat.x > x ? 'right' : 'left';
    }

    askY = y => {
        return this.props.cat.y > y ? 'down' : 'up';
    }

    render() {
    	const { style, face } = this.state,
            className = `dog dog-${face}`;

    	style.backgroundSize = '95%';

    	return (
	        <span className={className} style={style}></span>
	    )
    }
}

const mapStateToProps = state => (
    {
        cat: state.garden.cat,
        spaceWidth: state.garden.spaceWidth
    }
);

export default connect(mapStateToProps)(Dog);
