import React, { PureComponent, PropTypes } from 'react';

import { HINTS } from '../constants';

export default class Hints extends PureComponent {
  static propTypes = {
    showHints: PropTypes.func.isRequired,
    isShowing: PropTypes.bool.isRequired,
    isFirstGame: PropTypes.bool.isRequired
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

  render() {
    const { currentHint } = this.state;
    const { isShowing, showHints } = this.props;
    const className = `hints ${currentHint && currentHint.className} ${isShowing ? 'js-showing-hints' : ''}`;
    return (
      <div className={className}>
        <div className="hints__controls">
          <button onClick={()=>{ this.getHint(-1); }}>Previous</button>
          <button onClick={()=>{ this.getHint(1); }}>Next</button>
          <button onClick={()=>{ this.getHint(0); showHints(false); }}>Hide</button>
        </div>

        <div className="hints__message">{currentHint && currentHint.hint}</div>
      </div>
    );
  };
}
