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
            { x, y } = this.state,
            { cat } = this.props;

        if (Dog.isStuck) {
            console.log('stuck');
            (() => {
                const { x, y } = Dog.state,
                    alternates = Dog.turn(Dog.state.face),
                    goodAlternate = Dog.checkMove(x, y, alternates.right);

                if (goodAlternate) {
                    // console.log('Try ' + alternates.right);
                    if (goodAlternate)
                        Dog.moveForward(goodAlternate.x, goodAlternate.y, alternates.right);
                        Dog.isStuck = false;

                    setTimeout(() => {
                        const { x, y } = Dog.state,
                            goodAlternate = Dog.checkMove(x, y, alternates.left);
                        // console.log('Then ' + alternates.left);
                        if (goodAlternate)
                            Dog.moveForward(goodAlternate.x, goodAlternate.y, alternates.left);
                            Dog.isStuck = false;
                    }, 500);
                } 
            })();

        } else {
            if (cat.x !== x)
                Dog.takeStep('x');

            setTimeout(() => {
                if (cat.y !== y) {
                    const isStuck = Dog.takeStep('y');
                    Dog.isStuck = isStuck;
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

    turn = currentFace => {
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
            },
            rightTurn = rights[currentFace],
            leftTurn = lefts[rightTurn];

        return {
            right: rightTurn,
            left: leftTurn
        } 
    }

    lookHorizontal = x => {
        return this.props.cat.x > x ? 'right' : 'left';
    }

    lookVertical = y => {
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
