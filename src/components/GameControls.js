import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/';
import { 
  GAME_STYLE_OPTIONS,
  IN_GAME_SWITCHES,
  STARTING_NEW_GAME_MESSAGE
} from '../constants';

class GameControls extends PureComponent {
  static propTypes = {
    gameSwitches: PropTypes.object.isRequired,
    showHints: PropTypes.func.isRequired,
    isShowing: PropTypes.bool.isRequired,
    isFirstGame: PropTypes.bool.isRequired
  }

  startGame = () => {
    const { showHints, isFirstGame, updateSimpleState } = this.props;
    updateSimpleState({isShowingControls: false});
    setTimeout(() => showHints(false), 100);
    if (isFirstGame) {
      this.playFirstGame();
    } else {
      this.playNewGame();
    }
  }

  playFirstGame = () => {
    setTimeout(() => {
      this.props.updateSimpleState({gameSwitches: IN_GAME_SWITCHES});
    }, 500);
  }

  playNewGame = () => {
    // close the shutters
    this.props.updateSimpleState({
      gameSwitches: {
        ...this.props.gameSwitches,
        isOpenShutters: false
      },
      shuttersMessage: STARTING_NEW_GAME_MESSAGE
    });

    // reset the game
    setTimeout(() => {
      this.props.updateSimpleState({
        stats: {
          mealsEaten: 0,
          energy: 10,
          secondsRemaining: 60
        },
        isShowingStats: false
      });
    }, 1000);

    // start the new game
    setTimeout(() => {
      this.props.updateSimpleState({
        gameSwitches: IN_GAME_SWITCHES
      });
    }, 1500);
  }

  setDifficulty = e => {
  this.props.updateSimpleState({
  difficulty: parseInt(e.target.value, 10)
  });
  }

  setGameStyle = e => {
    this.props.updateSimpleState({
      gameStyle: e.target.value
    });
  }

  render() {
    const { isShowing, showHints } = this.props;
    return (
      <div className={`gamecontrols ${isShowing ? 'js-showing-controls' : ''}`}>
        <select onChange={this.setGameStyle}>
          {GAME_STYLE_OPTIONS.map((style, index) => {
            return (
              <option 
                key={`option-${style.name}`} 
                value={style.name}
              >{style.displayName}</option>
            )
          })}
        </select>
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
    gameSwitches: state.gameSwitches,
    isShowing: state.isShowingControls
  }
);

export default connect(mapStateToProps, {
  updateSimpleState
})(GameControls);
