import React, { Component, PropTypes } from 'react';

export default class EndStats extends Component {

    static PropTypes = {
        newGame: PropTypes.func.isRequired,
        statsInfo: PropTypes.array.isRequired,
        secsRemaining: PropTypes.number.isRequired,
        energy: PropTypes.number.isRequired,
        mealsEaten: PropTypes.number.isRequired,
        timesStuck: PropTypes.number.isRequired,
    };

    state = {
        stats: []
    };

    componentWillMount() {
        this.state.stats = [
            `You lasted for ${60 - this.props.secsRemaining} seconds.`,
            `You finished with ${this.props.energy} energy.`,
            `You ate ${this.props.mealsEaten} meals.`           
        ]
        if (this.props.timesStuck == 1) {
            this.state.stats.push("You got stuck once.");
        } else if (this.props.timesStuck == 2) {
            this.state.stats.push("You got stuck twice.");
        } else {
            this.state.stats.push(`You got stuck ${this.props.timesStuck} times.`);
        }
    };

    componentWillUnmount() {
        this.state.stats = [];
    }

    render() {
        return (
            <div className="stats">
                <div className="stats__inner">
                    <button className="shutter__ctrl new" onClick={()=>{this.props.newGame()}} >New game</button>
                    <div className="stats__text">
                        <h4>Finishing stats:</h4>
                        {this.state.stats.map(function(stat, index) {
                            return (
                                <p key={index} className="stat">{stat}</p>
                            )
                        }.bind(this))}
                    </div>
                </div>
                
            </div>
        );
    };

    
}
