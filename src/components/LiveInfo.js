import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { endTheGame, updateSimpleState } from '../actions/';

class LiveInfo extends PureComponent {
  static propTypes = {
    stats: PropTypes.object.isRequired,
    isGameOver: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.isInGame = true;
    // this.intervalID = setInterval(this.countDown, 1000);
  }

  componentWillUnmount() {
    this.isInGame = false;
    clearInterval(this.intervalID);
  }

  countDown = () => {
    const { isGameOver, stats } = this.props;
    if (this.isInGame && !isGameOver) {
      if (stats.secondsRemaining === 0) {
        endTheGame('You finished 60 seconds, well done!');
      } else {
        this.props.updateSimpleState({
          stats: {
            ...stats,
            secondsRemaining: stats.secondsRemaining - 1
          }
        });
      }
    }
  }

  render() {
    const { stats } = this.props;
    return (
      <div className="info">
        <span>{`${stats.secondsRemaining} seconds to go`}</span>
        <span>|</span>
        <span>{`Energy: ${stats.energy}`}</span>
      </div>
    );
  };
};

const mapStateToProps = state => (
  {
    stats: state.stats,
    isGameOver: state.gameSwitches.isGameOver
  }
)

export default connect(mapStateToProps, {
  updateSimpleState
})(LiveInfo);