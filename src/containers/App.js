import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateGameState, updateSingleProp } from '../actions/actions_game';
import { updateStats } from '../actions/actions_stats';
import Board from '../components/Board';
import Shutters from '../components/Shutters';
import Hints from '../components/Hints';
import LiveInfo from '../components/LiveInfo';
import EndStats from '../components/EndStats';
import GameControls from '../components/GameControls';

import '../scss/garden.css';

class App extends Component {
    constructor() {
        super();
        this.isFirstGame = true;
    }

    static propTypes = {
        gameSwitches: PropTypes.object.isRequired,
        message: PropTypes.string.isRequired,
        isShowingStats: PropTypes.bool.isRequired
    }

    state = {
        isShowingHints: false,
        isReadyShutters: false,
        isShowingControls: true
    }

    endTheGame = message => {
        const { gameSwitches } = this.props;

        if (this.isFirstGame) {
            this.isFirstGame = false;
        }

        // freeze game, display reason, change bg colour
        this.props.updateGameState({
            switches: { ...gameSwitches, isGameOver: true },
            message,
            shuttersMessage: 'Getting game stats...'
        });

        // close shutters after time to read reason
        setTimeout(() => {
            const { gameSwitches } = this.props;
            this.props.updateSingleProp({ ...gameSwitches, isOpenShutters: false }, 'HIT_GAME_SWITCHES');
        }, 3000);

        // destroy board and live info, show stats when shutters complete transition
        setTimeout(() => {
            const { gameSwitches } = this.props;
            this.props.updateSingleProp({ ...gameSwitches, isInGame: false }, 'HIT_GAME_SWITCHES');
            this.props.updateStats(true, 'SHOW_STATS');
        }, 4000);

        // open shutters
        setTimeout(() => {
            const { gameSwitches } = this.props;
            this.props.updateSingleProp({ ...gameSwitches, isOpenShutters: true }, 'HIT_GAME_SWITCHES');

            // stop controls coming up until shutters complete transition
            setTimeout(() => this.showControls(true), 1000);
        }, 5000);
    }

    showHints = status => {
        this.setState({ ...this.state, isShowingHints: status });
    }

    showControls = status => {
        this.setState({ ...this.state, isShowingControls: status });
    }

    render() {
        const { gameSwitches, isShowingStats, message } = this.props;
        const { isShowingHints, isShowingControls } = this.state;
        const backgroundStyle = { backgroundColor: gameSwitches.isGameOver ? '#ad9549' : '#fff'};

        return (
            <div className="main-container">
                <div className="garden__bg" style={backgroundStyle}></div>
                <div className="garden__container">
                    <div id="sample-space" className="garden__space garden__space--sample"></div>
                    {gameSwitches.isInGame && <Board width={10} height={8} endTheGame={this.endTheGame} />}
                    {gameSwitches.isInGame && <LiveInfo endTheGame={this.endTheGame} />}
                    {isShowingStats && <EndStats />}
                    <div className={`garden__message ${gameSwitches.isGameOver ? 'js-visible-message' : ''}`}>
                        <p>{message}</p>
                    </div>
                </div>
                <Shutters isOpen={gameSwitches.isOpenShutters} />
                <Hints
                    isShowing={isShowingHints}
                    showHints={this.showHints}
                    isFirstGame={this.isFirstGame}
                />
                <GameControls
                    isShowing={isShowingControls}
                    isShowingHints={isShowingHints}
                    showHints={this.showHints}
                    showControls={this.showControls}
                    isFirstGame={this.isFirstGame}
                />
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        gameSwitches: state.game.switches,
        message: state.game.message,
        isShowingStats: state.stats.isShowing,
    }
);

export default connect(mapStateToProps, {
    updateGameState,
    updateSingleProp,
    updateStats
})(App);
