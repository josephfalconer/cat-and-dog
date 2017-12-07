import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BoardActionCreators from '../actions/actions_board';
import * as StatsActionCreators from '../actions/actions_stats';
import * as helpers from '../actions/helpers';
import Player from './Player';
import DirectionButtons from './DirectionButtons';


class Human extends Player {

    constructor(props) {
        super(props);
        this.name = 'HUMAN';
        this.updateBoard = bindActionCreators(BoardActionCreators.updateBoard, props.dispatch);
        this.updateStats = bindActionCreators(StatsActionCreators.updateStats, props.dispatch);
        this.endTheGame = props.endTheGame;
        this.updateSpaces = props.updateSpaces;
    }

    static propTypes = {
        stats: PropTypes.object.isRequired,
        endTheGame: PropTypes.func.isRequired,
        gameSwitches: PropTypes.object.isRequired,
        spaces: PropTypes.array.isRequired,
        human: PropTypes.object.isRequired,
        updateSpaces: PropTypes.func.isRequired
    }

    state = {
        style: helpers.writeTransform(),
        face: 'LEFT'
    }
    
    componentDidMount() {
        this.isInGame = true;

        this.moveForward(9, 7, 'LEFT');
        this.updateBoard({x: 9, y: 7}, 'UPDATE_HUMAN_POSITION');

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
        if (this.props.gameSwitches.isGameOver) return;

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
        let updatedSpaces;

        if (this.isInGame)
            // always face attempted direction
            this.setState({ ...this.state, face: direction });
    
        if (!validXY) 
            return;

        if (validXY.occupant === 'FOOD') 
            this.updateEnergy(1);

        if (validXY.occupant === 'ROBOT') {
            this.endTheGame('You ran into the dog!')
            return;
        }

        updatedSpaces = this.moveForward(validXY.x, validXY.y, direction);
        this.updateBoard({x: validXY.x, y: validXY.y}, 'UPDATE_HUMAN_POSITION');
        this.updateSpaces(updatedSpaces);
    }

    updateEnergy = change => {
        if (!this.isInGame || this.props.gameSwitches.isGameOver) return;

        const { stats } = this.props;
            
        if (stats.energy === 0) {
            this.endTheGame('You ran out of energy!');
            return;
        }

        this.updateStats({
            ...stats,
            mealsEaten: change === 1 ? stats.mealsEaten + 1 : stats.mealsEaten,
            energy: stats.energy + change
        }, 'UPDATE_STATS');
    }

    render() {
    	const { style, face } = this.state,
            className = `cat cat-${face.toLowerCase()}`;
            
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
        human: state.board.human,
        stats: state.stats.stats,
        gameSwitches: state.game.switches
    }
);

export default connect(mapStateToProps)(Human);
