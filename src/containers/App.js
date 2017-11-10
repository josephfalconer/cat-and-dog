import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as StatsActionCreators from '../actions/actions_stats';
import Garden from '../components/Garden';
import Hints from '../components/Hints';

import '../css/garden.css'; 


class App extends Component {

    static propTypes = {
        isInGame: PropTypes.bool.isRequired
    }

    state = {
        isViewingHints: false
    }

    endTheGame = () => {
        this.setState({ ...this.state, isInGame: false });
    }

    startTheGame = () => {

        this.setState({ ...this.state, isInGame: true });
    }

    render() {
        const { isInGame, dispatch } = this.props,
            updateStats = bindActionCreators(StatsActionCreators.updateStats, dispatch)

        return (
            <div className="main-container">

                <div className="garden__bg"></div>

                <button className="" onClick={()=>{ updateStats(true, 'UPDATE_GAME_STATUS');}}>Start Game</button>
                <button className="" onClick={()=>{ updateStats(false, 'UPDATE_GAME_STATUS');}}>End Game</button>
                <button className="" onClick={()=>{ this.setState({...this.state, isViewingHints: true}); }}>Show hints</button>

                <div className="garden__contr">

                    {isInGame &&
                        <Garden
                            width={10}
                            height={8}
                        />
                    }
                </div>

                {this.state.isViewingHints &&
                    <Hints />
                }

            </div>
        );
    }    
}

const mapStateToProps = state => (
    {
        isInGame: state.stats.isInGame
    }
);

export default connect(mapStateToProps)(App);
