import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/';
import * as helpers from '../helpers';
import DirectionButtons from './DirectionButtons';
import Player from './Player';

class Human extends Player {
    constructor(props) {
        super(props);
        this.name = 'HUMAN';
        this.endTheGame = props.endTheGame;
    }

    static propTypes = {
        currentFoods: PropTypes.array.isRequired,
        stats: PropTypes.object.isRequired,
        endTheGame: PropTypes.func.isRequired,
        gameSwitches: PropTypes.object.isRequired,
        robots: PropTypes.array.isRequired,
    }

    state = {
        style: helpers.writeTransform(),
        face: 'LEFT'
    }

    componentDidMount() {
        this.isInGame = true;
        this.moveForward(9, 7, 'LEFT');
        this.props.updateSimpleState({human: {x: 9, y: 7}});
        this.intervalID = setInterval(() => {
            this.updateEnergy(-1);
        }, 2500);
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        this.isInGame = false;
        clearInterval(this.intervalID);
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = e => {
        if (this.props.gameSwitches.isGameOver) {
            return;
        }
        let direction = null;

        switch (e.which) {
            case 37:
                direction = 'LEFT';
                break;

            case 38:
                direction = 'UP';
                break;

            case 39:
                direction = 'RIGHT';
                break;

            case 40:
                direction = 'DOWN';
                break;

            default:
                return false;
        }

        this.moveHumanForward(direction);
    }

    moveHumanForward = direction => {
        const { robots, currentFoods } = this.props;
        const validXY = this.checkMove(this.state.x, this.state.y, direction);
        let isDogNextSpace = false;

        if (!this.isInGame) {
            return;
        }
        // always face new direction
        this.setState({ ...this.state, face: direction });

        if (validXY) {
            currentFoods.forEach(food => {
                if (food.x === validXY.x && food.y === validXY.y) {
                    this.updateEnergy(1);
                }
            });

            robots.forEach((robot) => {
                if (robot.x === validXY.x && robot.y === validXY.y) {
                    this.endTheGame('You ran into a dog!')
                    isDogNextSpace = true;
                }
            });

            if (!isDogNextSpace) {
                this.moveForward(validXY.x, validXY.y, direction);
                this.props.updateSimpleState({
                    human: {x: validXY.x, y: validXY.y}
                });
            }
        }
    }

    updateEnergy = change => {
        if (!this.isInGame || this.props.gameSwitches.isGameOver) {
            return;
        }
        const { stats } = this.props;

        if (stats.energy === 0) {
            this.endTheGame('You ran out of energy!');
            return;
        }

        this.props.updateSimpleState({
            stats: {
                ...stats,
                mealsEaten: change === 1 ? stats.mealsEaten + 1 : stats.mealsEaten,
                energy: stats.energy + change
            }
        });
    }

    render() {
    	const { style, face } = this.state;
        const className = `cat cat-${face.toLowerCase()}`;
        style.backgroundSize = '75%';
    	return (
            <div>
    	        <span className={className} style={style}></span>
                {'ontouchstart' in document.documentElement &&
                    <DirectionButtons moveHuman={this.moveHumanForward} />
                }
            </div>
	    )
    }
}

const mapStateToProps = state => {
    return {
        currentFoods: state.currentFoods,
        gameSwitches: state.gameSwitches,
        robots: state.robots,
        boardSpaces: state.boardSpaces,
        stats: state.stats
    }
}

export default connect(mapStateToProps, {
    updateSimpleState
})(Human);
