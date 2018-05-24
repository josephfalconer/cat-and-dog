import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/'
import { HINTS } from '../constants';

class Hints extends PureComponent {
  static propTypes = {
    isShowing: PropTypes.bool.isRequired,
  }

  state = {
    hintIndex: 0,
  }

  componentDidMount() {
    this.getHint(0);
  }

  getHint = increment => {
    const newIndex = this.state.hintIndex + increment;
    const nextHint = HINTS[newIndex];

    if (nextHint) {
      this.setState({
        ...this.state, 
        currentHint: HINTS[newIndex],
        hintIndex: newIndex
      });
    }
  }

  handleHide = () => {
    this.getHint(0);
    this.props.updateSimpleState({isShowingHints: false});
  }

  render() {
    const { currentHint } = this.state;
    const { isShowing } = this.props;
    const className = `hints ${currentHint && currentHint.className} ${isShowing ? 'js-showing-hints' : ''}`;
    return (
      <div className={className}>
        <div className="hints__controls">
          <button onClick={()=>{ this.getHint(-1); }}>Previous</button>
          <button onClick={()=>{ this.getHint(1); }}>Next</button>
          <button onClick={this.handleHide}>Hide</button>
        </div>

        <div className="hints__message">{currentHint && currentHint.hint}</div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    isShowing: state.isShowingHints || false
  }
}

export default connect(mapStateToProps, {
  updateSimpleState
})(Hints);
