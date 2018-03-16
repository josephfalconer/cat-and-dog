import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/';
import Board from '../components/Board';
import EndStats from '../components/EndStats';
import GameControls from '../components/GameControls';
import Hints from '../components/Hints';
import LiveInfo from '../components/LiveInfo';
import Shutters from '../components/Shutters';

import '../scss/garden.css';

class App extends Component {
    static propTypes = {
        endGameMessage: PropTypes.string.isRequired,
        gameSwitches: PropTypes.object.isRequired,
        isFirstGame: PropTypes.bool.isRequired,
        isShowingStats: PropTypes.bool.isRequired
    }

    state = {
        isShowingHints: false,
        isReadyShutters: false,
    }

    showHints = status => {
        this.setState({ ...this.state, isShowingHints: status });
    }

    render() {
        const { gameSwitches, isFirstGame, isShowingStats, endGameMessage } = this.props;
        const { isShowingHints } = this.state;
        const backgroundStyle = { backgroundColor: gameSwitches.isGameOver ? '#ad9549' : '#fff'};

        return (
            <div className="main-container">
                <div className="garden__bg" style={backgroundStyle}></div>
                <div className="garden__container">
                    <div id="sample-space" className="garden__space garden__space--sample"></div>
                    {gameSwitches.isInGame && <Board width={10} height={8} />}
                    {gameSwitches.isInGame && <LiveInfo />}
                    {isShowingStats && <EndStats />}
                    <div className={`garden__message ${gameSwitches.isGameOver ? 'js-visible-message' : ''}`}>
                        <p>{endGameMessage}</p>
                    </div>
                </div>
                <Shutters isOpen={gameSwitches.isOpenShutters} />
                <Hints
                    isShowing={isShowingHints}
                    showHints={this.showHints}
                    isFirstGame={isFirstGame}
                />
                <GameControls
                    isShowingHints={isShowingHints}
                    showHints={this.showHints}
                    isFirstGame={isFirstGame}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        endGameMessage: state.endGameMessage,
        gameSwitches: state.gameSwitches,
        isFirstGame: state.isFirstGame,
        isShowingStats: state.isShowingStats,
    }
};

export default connect(mapStateToProps, {
    updateSimpleState
})(App);
