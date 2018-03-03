import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/';
import Board from '../components/Board';
import EndStats from '../components/EndStats';
import GameControls from '../components/GameControls';
import Hints from '../components/Hints';
import LiveInfo from '../components/LiveInfo';
import Shutters from '../components/Shutters';
import { GETTING_STATS_MESSAGE } from '../constants';

import '../scss/garden.css';

class App extends Component {
    constructor() {
        super();
        this.isFirstGame = true;
    }

    static propTypes = {
        gameSwitches: PropTypes.object.isRequired,
        endGameMessage: PropTypes.string.isRequired,
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
        this.props.updateSimpleState({
            gameSwitches: {
                ...gameSwitches,
                isGameOver: true
            },
            endGameMessage: message,
            shuttersMessage: GETTING_STATS_MESSAGE
        });

        // close shutters after time to read reason
        setTimeout(() => {
            this.props.updateSimpleState({
                gameSwitches: {
                    ...this.props.gameSwitches,
                    isOpenShutters: false
                }
            });
        }, 3000);

        // destroy board and live info, show stats when shutters complete transition
        setTimeout(() => {
            this.props.updateSimpleState({
                gameSwitches: {
                    ...this.props.gameSwitches,
                    isInGame: false
                },
                isShowingStats: true,
            });
        }, 4000);

        // open shutters
        setTimeout(() => {
            this.props.updateSimpleState({
                gameSwitches: {
                    ...this.props.gameSwitches,
                    isOpenShutters: true
                }
            });
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
        const { gameSwitches, isShowingStats, endGameMessage } = this.props;
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
                        <p>{endGameMessage}</p>
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

const mapStateToProps = state => {
    return {
        gameSwitches: state.gameSwitches,
        endGameMessage: state.endGameMessage,
        isShowingStats: state.isShowingStats,
    }
};

export default connect(mapStateToProps, {
    updateSimpleState
})(App);
