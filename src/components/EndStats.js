import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class EndStats extends Component {

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
                <div className="stats__inner">
                    <div className="stats__text">
                        <h4>Finishing stats:</h4>
                        <p>{`You finished with ${stats.energy} energy.`}</p>
                        <p>{`You ate ${stats.mealsEaten} meals.`}</p>
                    </div>
                </div>
                
            </div>
        );
    }    
}

const mapStateToProps = state => (
    {
        stats: state.stats.stats
    }
);

export default connect(mapStateToProps)(EndStats);
