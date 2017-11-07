import React, { Component, PropTypes } from 'react';

export default class Timer extends Component {

    static propTypes = {
        updateSecsRemaining: PropTypes.func.isRequired,
        resetTimer: PropTypes.func.isRequired,
        updateImg: PropTypes.func.isRequired,
        updateMessage: PropTypes.func.isRequired,
        secsRemaining: PropTypes.number.isRequired,
        energy: PropTypes.number. isRequired,
        isEndedGame: PropTypes.bool.isRequired,
    }

    componentDidMount() {
        this.props.resetTimer();
        this.timeInterval = setInterval(this.countDown, 1000);
    };

    componentWillUnmount() {
        clearInterval(this.timeInterval);
    };

    countDown = () => {
        if (!this.props.isEndedGame) {
            // End the game when all the time has elapsed
            if (this.props.secsRemaining <= 0) {
                this.props.updateMessage("Well done! You completed 60 seconds.");
                this.props.updateImg("you-win");
                this.props.endTheGame();
            } else {
                this.props.updateSecsRemaining();
            }
        }
        
    };

    render() {
        return (
            <div className="info">
                <span id="time">{this.props.secsRemaining+' seconds to go'}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>|</span>
                <span id="energy">&nbsp;&nbsp;&nbsp;&nbsp;{'Energy: ' + this.props.energy}</span>
            </div>
        );
    };

};

