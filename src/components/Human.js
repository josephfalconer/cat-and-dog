import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GardenActionCreators from '../actions/actions_garden';
import * as StatsActionCreators from '../actions/actions_stats';
import * as helpers from '../actions/helpers';
import Player from './Player';
import DirectionButtons from './DirectionButtons';


class Human extends Player {

    constructor(props) {
        super(props);
        this.name = 'HUMAN';
        this.updateGarden = bindActionCreators(GardenActionCreators.updateGarden, props.dispatch);
        this.updateStats = bindActionCreators(StatsActionCreators.updateStats, props.dispatch);
    }

    static propTypes = {
        stats: PropTypes.object.isRequired,
        endTheGame: PropTypes.func.isRequired,
        spaceWidth: PropTypes.number.isRequired,
        gameSwitches: PropTypes.object.isRequired
    }

    state = {
        style: helpers.writeTransform(),
        face: 'LEFT'
    }
    
    componentDidMount() {
        this.isInGame = true;

        this.moveForward(9, 7, 'LEFT');
        this.updateGarden({x: 9, y: 7}, 'UPDATE_HUMAN_POSITION');

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

        this.handleMovement(direction);
    }

    handleMovement = direction => {
        if (this.props.gameSwitches.isGameOver) return;

        const { x, y } = this.state,
            { updateSpaces, spaces, endTheGame } = this.props,
            validXY = this.checkMove(x, y, direction, spaces);

        if (this.isInGame)
            // always face attempted direction
            this.setState({ ...this.state, face: direction });
    
        if (!validXY) 
            return;

        if (validXY.occupant === 'FOOD') 
            this.updateEnergy(1);

        if (validXY.occupant === 'ROBOT') {
            endTheGame('You ran into the dog!')
            return;
        }

        const updatedSpaces = this.moveForward(validXY.x, validXY.y, direction);
        this.updateGarden({x: validXY.x, y: validXY.y}, 'UPDATE_HUMAN_POSITION');
        updateSpaces(updatedSpaces);
    }

    updateEnergy = change => {
        if (!this.isInGame || this.props.gameSwitches.isGameOver) return;

        const { stats, spaceWidth, endTheGame } = this.props,
            { x, y } = this.state;
            
        if (stats.energy === 0) {
            endTheGame('You ran out of energy!');
            clearInterval(this.intervalID);
            document.removeEventListener('keydown', this.handleKeyPress);
            this.setState({...this.state, style: helpers.writeTransform(x * spaceWidth, y * spaceWidth, 180)});
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
                    <DirectionButtons moveHuman={this.handleMovement} />
                }

                
            </div>
	    )
    }
}

const mapStateToProps = state => (
    {
        stats: state.stats.stats,
        spaceWidth: state.garden.spaceWidth,
        gameSwitches: state.game.switches
    }
);

export default connect(mapStateToProps)(Human);
