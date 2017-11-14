import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GameActionCreators from '../actions/actions_game';
import Garden from '../components/Garden';
import Hints from '../components/Hints';
import LiveInfo from '../components/LiveInfo';

import '../css/garden.css'; 


class App extends Component {

    static propTypes = {
        isInGame: PropTypes.bool.isRequired
    }

    state = {
        isViewingHints: false
    }

    render() {
        const { isInGame, dispatch } = this.props,
            updateGame = bindActionCreators(GameActionCreators.updateGame, dispatch);

        return (
            <div className="main-container">

                <div className="garden__bg"></div>

                <button className="" onClick={()=>{ updateGame(true, 'UPDATE_GAME_STATUS');}}>Start Game</button>
                <button className="" onClick={()=>{ updateGame(false, 'UPDATE_GAME_STATUS');}}>End Game</button>
                <button className="" onClick={()=>{ this.setState({...this.state, isViewingHints: true}); }}>Show hints</button>

                <div className="garden__contr">

                    {isInGame &&
                        <Garden
                            width={10}
                            height={8}
                        />
                    }

                    <LiveInfo />
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
        isInGame: state.game.isInGame
    }
);

export default connect(mapStateToProps)(App);
