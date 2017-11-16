import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as StatsActionCreators from '../actions/actions_stats';

class LiveInfo extends Component {

    constructor(props) {
        super(props);
        this.updateStats = bindActionCreators(StatsActionCreators.updateStats, props.dispatch);
    }

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
        this.intervalID = setInterval(this.countDown, 1000);
    }

    componentWillUnmount() {
        this.isInGame = false;
        clearInterval(this.intervalID);
    }

    countDown = () => {
        if (!this.isInGame || this.props.gameSwitches.isGameOver) return

        const { secondsRemaining } = this.state,
            { stats } = this.props;

        if (secondsRemaining === 0) {
            this.props.endTheGame('You finished 60 seconds, well done!');

        } else {
            this.updateStats({
                ...stats,
                secondsRemaining: secondsRemaining - 1
            }, 'UPDATE_STATS');
            this.setState({ ...this.state, secondsRemaining: secondsRemaining - 1 });
        }
    }

    render() {
        const { stats } = this.props;

        return (
            <div className="info">
                <span id="time">{`${this.state.secondsRemaining} seconds to go`}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>|</span>
                <span id="energy">&nbsp;&nbsp;&nbsp;&nbsp;{`Energy: ${stats.energy}`}</span>
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

export default connect(mapStateToProps)(LiveInfo);