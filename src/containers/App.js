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
import GameControls from '../components/GameControls';

import '../css/garden.css'; 


class App extends Component {

    constructor(props) {
        super(props);
        this.updateGame = bindActionCreators(GameActionCreators.updateGame, props.dispatch);
        this.updateStats = bindActionCreators(StatsActionCreators.updateStats, props.dispatch);
        this.isFirstGame = true;
    }

    static propTypes = {
        gameSwitches: PropTypes.object.isRequired,
        message: PropTypes.string.isRequired,
        isShowingStats: PropTypes.bool.isRequired
    }

    state = {
        isShowingHints: true,
        isReadyShutters: false,
        isShowingControls: true
    }

    endTheGame = message => {
        const { gameSwitches } = this.props;

        if (this.isFirstGame)
            this.isFirstGame = false;

        // freeze game, display reason, change bg colour
        this.updateGame({ ...gameSwitches, isGameOver: true }, 'HIT_GAME_SWITCHES');
        this.updateGame(message, 'UPDATE_MESSAGE');
        this.updateGame('Getting game stats...', 'UPDATE_SHUTTERS_MESSAGE');

        // close shutters after time to read reason
        setTimeout(() => {
            const { gameSwitches } = this.props;
            this.updateGame({ ...gameSwitches, isOpenShutters: false }, 'HIT_GAME_SWITCHES');
        }, 3000);

        // destroy garden and live info, show stats when shutters complete transition
        setTimeout(() => {
            const { gameSwitches } = this.props;
            this.updateGame({ ...gameSwitches, isInGame: false }, 'HIT_GAME_SWITCHES');
            this.updateStats(true, 'SHOW_STATS');
        }, 4000);

        // open shutters
        setTimeout(() => {
            const { gameSwitches } = this.props;
            this.updateGame({ ...gameSwitches, isOpenShutters: true }, 'HIT_GAME_SWITCHES');

            // stop controls coming up until shutters complete transition
            setTimeout(() => {
                this.showControls(true);
            }, 1000);
        }, 5000);
    }

    showHints = status => {
        this.setState({ ...this.state, isShowingHints: status });
    }

    showControls = status => {
        this.setState({ ...this.state, isShowingControls: status });
    }

    render() {
        const { gameSwitches, isShowingStats, message } = this.props,
            { isShowingHints, isShowingControls } = this.state,
            backgroundStyle = { backgroundColor: gameSwitches.isGameOver ? '#ad9549' : '#fff'};

        return (
            <div className="main-container">

                <div className="garden__bg" style={backgroundStyle}></div>

                <div className="garden__container">

                    <div id="sample-space" className="garden__space garden__space--sample"></div>

                    {gameSwitches.isInGame && <Garden width={10} height={8} endTheGame={this.endTheGame} />}
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

export default connect(mapStateToProps)(App);
