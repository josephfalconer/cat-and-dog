import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateStats } from '../actions/actions_stats';
import { updateBoard } from '../actions/actions_board';
import * as helpers from '../actions/helpers';
import DirectionButtons from './DirectionButtons';
import Player from './Player';

class Human extends Player {
    constructor(props) {
        super(props);
        this.name = 'HUMAN';
        this.endTheGame = props.endTheGame;
    }

    static propTypes = {
        stats: PropTypes.object.isRequired,
        endTheGame: PropTypes.func.isRequired,
        gameSwitches: PropTypes.object.isRequired,
        spaces: PropTypes.array.isRequired,
        robots: PropTypes.array.isRequired,
    }

    state = {
        style: helpers.writeTransform(),
        face: 'LEFT'
    }

    componentDidMount() {
        this.isInGame = true;

        this.moveForward(9, 7, 'LEFT');
        this.props.updateBoard({x: 9, y: 7}, 'UPDATE_HUMAN_POSITION');

        // this.intervalID = setInterval(() => {
        //     this.updateEnergy(-1);
        // }, 2500);

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
        const validXY = this.checkMove(this.state.x, this.state.y, direction);
        const { robots } = this.props;
        let isDogNextSpace = true;

        if (this.isInGame) {
            // always face attempted direction
            this.setState({ ...this.state, face: direction });
        }

        console.log(validXY);

        if (!validXY) {
            return;
        }

        if (validXY.occupant === 'FOOD') {
            this.updateEnergy(1);
        }

        robots.forEach((robot) => {
            if (robot.x === validXY.x && robot.y === validXY.y) {
                this.endTheGame('You ran into the dog!')
                isDogNextSpace = false;
            }
        });

        if (isDogNextSpace) {
            this.moveForward(validXY.x, validXY.y, direction);
            this.props.updateBoard({x: validXY.x, y: validXY.y}, 'UPDATE_HUMAN_POSITION');
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

        this.props.updateStats({
            ...stats,
            mealsEaten: change === 1 ? stats.mealsEaten + 1 : stats.mealsEaten,
            energy: stats.energy + change
        }, 'UPDATE_STATS');
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

const mapStateToProps = state => (
    {
        gameSwitches: state.game.switches,
        robots: state.board.robots,
        spaces: state.board.spaces,
        stats: state.stats.stats
    }
);

export default connect(mapStateToProps, {
    updateBoard,
    updateStats
})(Human);
