import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class LiveInfo extends Component {

    static propTypes = {
        stats: PropTypes.object.isRequired
    }

    state = {
        secondsRemaining: 60
    }

    componentDidMount() {
        // this.intervalID = setInterval(this.countDown, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    countDown = () => {
        this.setState({ ...this.state, secondsRemaining: this.state.secondsRemaining - 1 })
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
        stats: state.stats.stats
    }
)

export default connect(mapStateToProps)(LiveInfo);