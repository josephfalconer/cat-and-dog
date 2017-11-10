import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as helpers from '../actions/helpers';
import Creature from './Creature';


class Dog extends Creature {

    constructor(props) {
        super(props);
        this.actionType = 'UPDATE_DOG_POSITION';
        this.isStuck = false;
        this.name = 'DOG';
    }

    static propTypes = {
        spaces: PropTypes.array.isRequired,
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
            newLeft = this.getLeft(face),
            validXY = this.checkMove(x, y, newLeft);

        this.turn(newLeft);

        if (validXY) {
            this.moveForward(validXY.x, validXY.y, newLeft);
            this.isStuck = false;

            setTimeout(() => {
                if (!this.isInGame)
                    return;

                const { x, y } = this.state,
                    newRight = this.getRight(newLeft),
                    validXY = this.checkMove(x, y, newRight);

                this.turn(newRight);

                if (validXY) {
                    this.moveForward(validXY.x, validXY.y, newRight);
                } else {
                    this.isStuck = true;
                }
            }, 500);
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
            newDirection = axis === 'x' ? this.askX(x) : this.askY(y),
            validXY = this.checkMove(x, y, newDirection);

        if (this.isInGame)
            this.setState({ ...this.state, face: newDirection });

        if (validXY) {
            this.moveForward(validXY.x, validXY.y, newDirection);
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
        spaces: state.garden.spaces,
        cat: state.garden.cat
    }
);

export default connect(mapStateToProps)(Dog);
