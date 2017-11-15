import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GameActionCreators from '../actions/actions_game';
import * as StatsActionCreators from '../actions/actions_stats';


class GameTrigger extends Component {
    constructor(props) {
        super(props);
        this.isPlayedGame = false;
    }

    static propTypes = {
        moveHints: PropTypes.func.isRequired,
        isShowing: PropTypes.bool.isRequired
    }

	startGame = () => {
        const { dispatch, moveHints } = this.props,
            updateGame = bindActionCreators(GameActionCreators.updateGame, dispatch),
            updateStats = bindActionCreators(StatsActionCreators.updateStats, dispatch);

        moveHints(false);
        updateGame('Starting a new game...', 'UPDATE_SHUTTERS_MESSAGE');

        if (!this.isPlayedGame) {
            this.isPlayedGame = true;
            this.playFirstGame(updateGame, updateStats);

        } else {
            this.playNewGame(updateGame, updateStats);
        }     
    }

    playFirstGame = (updateGame, updateStats) => {
        setTimeout(() => {
            updateGame(true, 'OPEN_SHUTTERS');
            updateGame(true, 'UPDATE_GAME_STATUS');
        }, 500);
    }

    playNewGame = (updateGame, updateStats) => {
        updateGame(false, 'OPEN_SHUTTERS');

        setTimeout(() => {
            updateStats(false, 'SHOW_STATS');
            updateStats({ mealsEaten: 0, energy: 10 }, 'UPDATE_STATS');
        }, 1000);

        setTimeout(() => {
            updateGame(false, 'GAME_OVER');
            updateGame(true, 'OPEN_SHUTTERS');
            updateGame(true, 'UPDATE_GAME_STATUS');
        }, 1500);
    }

    setDifficulty = () => {
        console.log('setDifficulty');
    }

    render() {
        return (
            <div className="gametrigger">
                <select className="" onChange={this.setDifficulty} >
                    <option value={600}>Easy</option>
                    <option value={500}>Medium</option>
                    <option value={400}>Hard</option>
                </select>

                <button onClick={this.startGame}>Start Game</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(GameTrigger);