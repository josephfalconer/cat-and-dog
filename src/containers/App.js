import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GameActionCreators from '../actions/actions_game';
import * as StatsActionCreators from '../actions/actions_stats';
import Garden from '../components/Garden';
import Shutters from '../components/Shutters';
import Hints from '../components/Hints';
import LiveInfo from '../components/LiveInfo';
import EndStats from '../components/EndStats';
import GameTrigger from '../components/GameTrigger';

import '../css/garden.css'; 


class App extends Component {

    static propTypes = {
        isInGame: PropTypes.bool.isRequired,
        isGameOver: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired
    }

    state = {
        isShowingHints: true
    }

    endTheGame = message => {
        const { dispatch } = this.props,
            updateGame = bindActionCreators(GameActionCreators.updateGame, dispatch),
            updateStats = bindActionCreators(StatsActionCreators.updateStats, dispatch);

        // console.log(message);

        // freeze immediately and bg colour
        updateGame(message, 'UPDATE_MESSAGE');
        updateGame(true, 'GAME_OVER');
        updateGame('Getting game stats...', 'UPDATE_SHUTTERS_MESSAGE');
        // 3 seconds freeze, 1 second for shutters closing
        setTimeout(() => {
            updateGame(false, 'OPEN_SHUTTERS');
        }, 3000);

        setTimeout(() => {
            updateGame(false, 'UPDATE_GAME_STATUS');
            updateStats(true, 'SHOW_STATS');
        }, 4000);

        setTimeout(() => {
            updateGame(true, 'OPEN_SHUTTERS');
        }, 5000);
    }

    moveHints = status => {
        this.setState({ ...this.state, isShowingHints: status });
    }

    render() {
        const { isInGame, isShowingStats, isOpenShutters, isGameOver, message } = this.props,
            { isShowingHints } = this.state,
            backgroundStyle = { backgroundColor: isGameOver ? '#ad9549' : '#fff'},
            isShowingGameTrigger = isShowingStats || isShowingHints;

        return (
            <div className="main-container">

                <div className="garden__bg" style={backgroundStyle}></div>

                <button className="" onClick={()=>{ this.moveHints(true); }}>Show hints</button>

                <div className="garden__contr">

                    {isInGame && <Garden width={10} height={8} endTheGame={this.endTheGame} />}
                    {isInGame && <LiveInfo />}

                    {isShowingStats && <EndStats />}

                    <div className={`garden__message ${isGameOver ? 'js-visible-message' : ''}`}>
                        <p>{message}</p>
                    </div>

                </div>

                <Shutters isOpen={isOpenShutters} />

                <Hints
                    isShowing={isShowingHints}
                    moveHints={this.moveHints}
                />

                {<GameTrigger isShowing={isShowingGameTrigger} moveHints={this.moveHints} />}

            </div>
        );
    }    
}

const mapStateToProps = state => (
    {
        isInGame: state.game.isInGame,
        isGameOver: state.game.isGameOver,
        isOpenShutters: state.game.isOpenShutters,
        message: state.game.message,
        isShowingStats: state.stats.isShowing,
    }
);

export default connect(mapStateToProps)(App);
