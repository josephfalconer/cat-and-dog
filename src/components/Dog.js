import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as helpers from '../actions/helpers';
import Creature from './Creature';


class Dog extends Creature {

    constructor(props) {
        super(props);
        this.updateType = 'UPDATE_DOG_POSITION';
        this.isStuck = false;
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

        // set movement interval
        this.intervalID = setInterval(this.findPath, 1000);
    }

    componentWillUnmount() {
    	// clear movement interval
    	window.clearInterval(this.intervalID);
    }

    findPath = () => {
        const Dog = this,
            { x, y, face } = this.state,
            { cat } = this.props;

        let gotStuck = false;

        if (Dog.isStuck) {
            console.log('stuck');
            // try a right-left movement
            Dog.takeDoubleStep(face, 'RIGHT');

            // try left-right instead
            if (Dog.isStuck) {
                Dog.takeDoubleStep(face, 'LEFT');
            }                    
                
        } else {
            // staircase-shaped movement
            if (cat.x !== x || cat.y !== y) {
                gotStuck = Dog.takeStep('x');
                Dog.isStuck = gotStuck;
            }

            setTimeout(() => {
                if (cat.y !== y) {
                    gotStuck = Dog.takeStep('y');
                    Dog.isStuck = gotStuck;
                }
            }, 500);
        }
    }

    takeStep = axis => {
        const { x, y } = this.state,
            newDirection = axis === 'x' ? this.lookHorizontal(x) : this.lookVertical(y),
            validXY = this.checkMove(x, y, newDirection);

        this.setState({ ...this.state, face: newDirection });

        if (validXY) {
            this.moveForward(validXY.x, validXY.y, newDirection);
            return false;
        }

        return true;
    }

    lookHorizontal = x => {
        return this.props.cat.x > x ? 'right' : 'left';
    }

    lookVertical = y => {
        return this.props.cat.y > y ? 'down' : 'up';
    }

    takeDoubleStep = (currentFace, firstTurn) => {
        const Dog = this,
            turns = Dog.getTurns(currentFace, firstTurn),
            rightFirst = firstTurn === 'RIGHT';

        Dog.stepRound(rightFirst ? turns.right : turns.left);

        setTimeout(() => {
            Dog.stepRound(rightFirst ? turns.left : turns.right);
        }, 500);
    }

    stepRound = direction => {
        const { x, y } = this.state,
            goodStep = this.checkMove(x, y, direction);

        if (goodStep) {
            this.moveForward(goodStep.x, goodStep.y, direction);
            this.isStuck = false;
        }
    }

    getTurns = (currentFace, firstTurn) => {
        const rights = {
                up: 'right',
                right: 'down',
                down: 'left',
                left: 'up'
            },
            lefts = {
                up: 'left',
                right: 'up',
                down: 'right',
                left: 'down'
            };

        switch (firstTurn) {
            case 'RIGHT': {
                const rightTurn = rights[currentFace],
                    leftTurn = lefts[rightTurn];

                return {
                    right: rightTurn,
                    left: leftTurn
                }
            }
            case 'LEFT': {
                const leftTurn = lefts[currentFace],
                    rightTurn = rights[leftTurn];

                return {
                    left: leftTurn,
                    right: rightTurn
                }
            }
        }                
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
