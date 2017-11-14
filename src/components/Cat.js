import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GardenActionCreators from '../actions/actions_garden';
import * as GameActionCreators from '../actions/actions_game';
// import * as StatsActionCreators from '../actions/actions_stats';
import * as helpers from '../actions/helpers';
import Creature from './Creature';


class Cat extends Creature {

    constructor(props) {
        super(props);
        this.actionType = 'UPDATE_CAT_POSITION';
        this.name = 'CAT';
    }

    state = {
        style: helpers.writeTransform(),
        face: 'left',
        energy: 10,
        mealsEaten: 0
    }
    
    componentDidMount() {
        this.moveForward(9, 7, 'left');
        // TODO energy-decrease interval
        document.addEventListener('keydown', this.handleKeyPress);
        this.isInGame = true;
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
        this.isInGame = false;
        // update end stats
    }

    handleKeyPress = e => {
        const { x, y } = this.state,
            { dispatch, updateSpaces, spaces } = this.props,
            updateGame = bindActionCreators(GameActionCreators.updateGame, dispatch),
            updateGarden = bindActionCreators(GardenActionCreators.updateGarden, dispatch),
            face = this.getFace(e.which),
            validXY = this.checkMove(x, y, face, spaces);

        if (this.isInGame && face)
            // always face attempted direction
            this.setState({ ...this.state, face: face });
    
        if (!validXY) 
            return;

        if (validXY.occupant === 'FOOD') 
            this.feed();

        if (validXY.occupant === 'DOG') {
            // updateGame('You ran into the dog!', 'UPDATE_SHUTTERS_MESSAGE');
            updateGame(false, 'UPDATE_GAME_STATUS');
            console.log('Found the dog!');
            return;
        }

        const updatedSpaces = this.moveForward(validXY.x, validXY.y, face);
        updateGarden({x: validXY.x, y: validXY.y}, 'UPDATE_CAT_POSITION');
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

    feed = () => {
        // console.log('feed');
        // const { dispatch } = this.props,
        //     updateStats = bindActionCreators(StatsActionCreators.updateStats, dispatch);

        this.setState({
            ...this.state,
            mealsEaten: this.state.mealsEaten + 1,
            energy: this.state.energy + 1
        });        
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Cat);
