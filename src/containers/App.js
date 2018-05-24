import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/';
import Board from '../components/Board';
import EndStats from '../components/EndStats';
import GameControls from '../components/GameControls';
import Hints from '../components/Hints';
import LiveInfo from '../components/LiveInfo';
import Shutters from '../components/Shutters';

import '../scss/garden.css';

class App extends PureComponent {
  static propTypes = {
    endGameMessage: PropTypes.string.isRequired,
    gameSwitches: PropTypes.object.isRequired,
    isShowingStats: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
      this.setSampleSpaceRef = element => {
      this.sampleSpace = element;
    }
  }

  componentDidMount() {
    this.updateSampleSpaceWidth();
    window.addEventListener('resize', this.updateSampleSpaceWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSampleSpaceWidth);
  }

  updateSampleSpaceWidth = () => {
    this.props.updateSimpleState({sampleSpaceWidth: this.sampleSpace.offsetWidth});
  }

  render() {
    const { gameSwitches, isShowingStats, endGameMessage } = this.props;
    const backgroundStyle = { backgroundColor: gameSwitches.isGameOver ? '#ad9549' : '#fff'};
    return (
      <div className="main-container">
        <div className="garden__bg" style={backgroundStyle}></div>
        <div className="garden__container">
          <span 
            ref={this.setSampleSpaceRef} 
            id="sample-space" 
            className="garden__space garden__space--sample"
          ></span>
          {gameSwitches.isInGame && <Board width={10} height={8} />}
          {gameSwitches.isInGame && <LiveInfo />}
          {isShowingStats && <EndStats />}
          <div className={`garden__message ${gameSwitches.isGameOver ? 'js-visible-message' : ''}`}>
          <p>{endGameMessage}</p>
          </div>
        </div>
        <Shutters isOpen={gameSwitches.isOpenShutters} />
        <Hints />
        <GameControls />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    endGameMessage: state.endGameMessage,
    gameSwitches: state.gameSwitches,
    isShowingStats: state.isShowingStats,
  }
};

export default connect(mapStateToProps, {
  updateSimpleState
})(App);
