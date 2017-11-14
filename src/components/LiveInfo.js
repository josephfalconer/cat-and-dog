import React, { Component, PropTypes } from 'react';

export default class LiveInfo extends Component {

    static propTypes = {
        updateSecsRemaining: PropTypes.func,
        resetTimer: PropTypes.func,
        updateImg: PropTypes.func,
        updateMessage: PropTypes.func,
        secsRemaining: PropTypes.number,
        energy: PropTypes.number,
        isEndedGame: PropTypes.bool,
    }

    state = {
        secondsRemaining: 60
    }

    componentDidMount() {
        this.intervalID = setInterval(this.countDown, 1000);
        console.log('hello');
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    countDown = () => {
        console.log('countdown');
        this.setState({ ...this.state, secondsRemaining: this.state.secondsRemaining - 1 })
        
    }

    render() {
        return (
            <div className="info">
                <span id="time">{this.state.secondsRemaining+' seconds to go'}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>|</span>
                <span id="energy">&nbsp;&nbsp;&nbsp;&nbsp;{'Energy: ' + this.props.energy}</span>
            </div>
        );
    };

};

