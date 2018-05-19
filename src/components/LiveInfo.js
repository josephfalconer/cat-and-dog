import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { endTheGame, updateSimpleState } from '../actions/';

class LiveInfo extends PureComponent {
  static propTypes = {
    stats: PropTypes.object.isRequired,
    gameSwitches: PropTypes.object.isRequired,
  }

  state = {
    secondsRemaining: 60
  }

  componentDidMount() {
    this.isInGame = true;
    this.intervalID = setInterval(this.countDown, 1000);
  }

  componentWillUnmount() {
    this.isInGame = false;
    clearInterval(this.intervalID);
  }

  countDown = () => {
    const { secondsRemaining } = this.state;
    if (this.isInGame || !this.props.gameSwitches.isGameOver) {
      if (secondsRemaining === 0) {
        endTheGame('You finished 60 seconds, well done!');
      } else {
        this.props.updateSimpleState({
          stats: {
            ...this.props.stats,
            secondsRemaining: secondsRemaining - 1
          }
        });
        this.setState({secondsRemaining: secondsRemaining - 1});
      }
    }
  }

  render() {
    return (
      <div className="info">
        <span>{`${this.state.secondsRemaining} seconds to go`}</span>
        <span>|</span>
        <span>{`Energy: ${this.props.stats.energy}`}</span>
      </div>
    );
  };
};

const mapStateToProps = state => (
  {
    stats: state.stats,
    gameSwitches: state.gameSwitches
  }
)

export default connect(mapStateToProps, {
  updateSimpleState
})(LiveInfo);