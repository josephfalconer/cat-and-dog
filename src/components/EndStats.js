import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

class EndStats extends PureComponent {
  static PropTypes = {
    stats: PropTypes.object.isRequired
  }

  state = {
    stats: []
  }

  render() {
  const { stats } = this.props;
  return (
    <div className="stats">
      <div className="stats__text">
        <h4>{`${stats.secondsRemaining === 0 ? 'YOU WIN!' : 'GAME OVER'}`}</h4>
        <p>{`You lasted for ${60 - stats.secondsRemaining} seconds.`}</p>
        <p>{`You finished with ${stats.energy} energy.`}</p>
        <p>{`You ate ${stats.mealsEaten} meals.`}</p>
      </div>                
    </div>
    );
  }    
}

const mapStateToProps = state => (
  {
    stats: state.stats
  }
);

export default connect(mapStateToProps)(EndStats);
