import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GardenActionCreators from '../actions/actions_garden';
import * as StatsActionCreators from '../actions/actions_stats';
import * as helpers from '../actions/helpers';
import Creature from './Creature';


class Cat extends Creature {

    constructor(props) {
        super(props);
        this.name = 'CAT';
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
        face: 'left'
    }
    
    componentDidMount() {
        this.isInGame = true;

        this.moveForward(9, 7, 'left');
        this.updateGarden({x: 9, y: 7}, 'UPDATE_CAT_POSITION');

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

        const { x, y } = this.state,
            { updateSpaces, spaces, endTheGame } = this.props,
            face = this.getFace(e.which),
            validXY = this.checkMove(x, y, face, spaces);

        if (this.isInGame && face)
            // always face attempted direction
            this.setState({ ...this.state, face: face });
    
        if (!validXY) 
            return;

        if (validXY.occupant === 'FOOD') 
            this.updateEnergy(1);

        if (validXY.occupant === 'DOG') {
            endTheGame('You ran into the dog!')
            return;
        }

        const updatedSpaces = this.moveForward(validXY.x, validXY.y, face);
        this.updateGarden({x: validXY.x, y: validXY.y}, 'UPDATE_CAT_POSITION');
        updateSpaces(updatedSpaces);
    }

    getFace = key => {
        switch (key) {
            case 37: 
                return 'left';
                
            case 38:
                return 'up';
                
            case 39:
                return 'right';
                
            case 40:
                return 'down';
                
            default:
                return false;
        }
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
            className = `cat cat-${face}`;
            
        style.backgroundSize = '75%';

    	return (
	        <span className={className} style={style}></span>
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

export default connect(mapStateToProps)(Cat);
