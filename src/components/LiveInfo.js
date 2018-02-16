import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateStats } from '../actions/actions_stats';

class LiveInfo extends Component {
    static propTypes = {
        stats: PropTypes.object.isRequired,
        endTheGame: PropTypes.func.isRequired,
        gameSwitches: PropTypes.object.isRequired,
    }

    state = {
        secondsRemaining: 60
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
        if (!this.isInGame || this.props.gameSwitches.isGameOver) return
        const { secondsRemaining } = this.state;

        if (secondsRemaining === 0) {
            this.props.endTheGame('You finished 60 seconds, well done!');
        } else {
            this.props.updateStats({
                ...this.props.stats,
                secondsRemaining: secondsRemaining - 1
            }, 'UPDATE_STATS');
            this.setState({ ...this.state, secondsRemaining: secondsRemaining - 1 });
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
        stats: state.stats.stats,
        gameSwitches: state.game.switches
    }
)

export default connect(mapStateToProps, {
    updateStats
})(LiveInfo);