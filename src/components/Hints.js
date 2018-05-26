import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/'
import { HINTS } from '../constants';

class Hints extends PureComponent {
  static propTypes = {
    isShowing: PropTypes.bool.isRequired,
    currentHint: PropTypes.object.isRequired,
    currentHintIndex: PropTypes.number.isRequired
  }

  getHint = increment => {
    const newIndex = this.props.currentHintIndex + increment;
    const nextHint = HINTS[newIndex];
    if (nextHint) {
      this.props.updateSimpleState({
        currentHint: nextHint,
        currentHintIndex: newIndex
      });
    }
  }

  getNextHint = () => {
    this.getHint(1);
  }

  getPreviousHint = () => {
    this.getHint(-1);
  }

  hideHints = () => {
    this.getHint(0);
    this.props.updateSimpleState({isShowingHints: false});
  }

  render() {
    const { currentHint, isShowing } = this.props;
    const className = `hints ${currentHint && currentHint.className} ${isShowing ? 'js-showing-hints' : ''}`;
    return (
      <div className={className}>
        <div className="hints__controls">
          <button onClick={this.getPreviousHint}>Previous</button>
          <button onClick={this.getNextHint}>Next</button>
          <button onClick={this.hideHints}>Hide</button>
        </div>

        <div className="hints__message">{currentHint && currentHint.hint}</div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    isShowing: state.isShowingHints || false,
    currentHint: state.currentHint || HINTS[0],
    currentHintIndex: state.currentHintIndex || 0
  }
}

export default connect(mapStateToProps, {
  updateSimpleState
})(Hints);
