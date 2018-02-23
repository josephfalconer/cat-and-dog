import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSingleProp } from '../actions/actions_game';
import { updateStats } from '../actions/actions_stats';

class GameControls extends Component {
    static propTypes = {
        gameSwitches: PropTypes.object.isRequired,
        showHints: PropTypes.func.isRequired,
        showControls: PropTypes.func.isRequired,
        isShowing: PropTypes.bool.isRequired,
        isFirstGame: PropTypes.bool.isRequired
    }

	startGame = () => {
        const { showHints, showControls, isFirstGame } = this.props;

        showControls(false);
        setTimeout(() => {
            showHints(false);
        }, 100);
        this.props.updateSingleProp('Starting a new game...', 'UPDATE_SHUTTERS_MESSAGE');

        if (isFirstGame) {
            this.playFirstGame();

        } else {
            this.playNewGame();
        }
    }

    playFirstGame = () => {
        setTimeout(() => {
            this.props.updateSingleProp({
                ...this.props.gameSwitches,
                isInGame: true,
                isOpenShutters: true
            }, 'HIT_GAME_SWITCHES');

        }, 500);
    }

    playNewGame = () => {
        this.props.updateSingleProp({
            ...this.props.gameSwitches,
            isOpenShutters: false
        }, 'HIT_GAME_SWITCHES');

        setTimeout(() => {
            this.props.updateStats(false, 'SHOW_STATS');
            this.props.updateStats({
                mealsEaten: 0,
                energy: 10,
                secondsRemaining: 60 }, 'UPDATE_STATS');
        }, 1000);

        setTimeout(() => {
            this.props.updateSingleProp({
                isInGame: true,
                isOpenShutters: true,
                isGameOver: false
            }, 'HIT_GAME_SWITCHES');

        }, 1500);
    }

    setDifficulty = e => {
        this.props.updateSingleProp(parseInt(e.target.value, 10), 'UPDATE_DIFFICULTY');
    }

    render() {
        const { isShowing, showHints } = this.props;

        return (
            <div className={`gamecontrols ${isShowing ? 'js-showing-controls' : ''}`}>
                <select className="" onChange={this.setDifficulty} >
                    <option value="800">Easy</option>
                    <option value="600">Medium</option>
                    <option value="400">Hard</option>
                </select>
                <button onClick={this.startGame}>Start Game</button>
                <button onClick={()=>{ showHints(true); }}>Show hints</button>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        gameSwitches: state.game.switches
    }
);

export default connect(mapStateToProps, {
    updateSingleProp,
    updateStats
})(GameControls);