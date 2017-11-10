import React, { Component } from 'react';


const hints = [
    { hint: "Get the yummy food.", className: "get-food" },
    { hint: "If you get too tired it's game over.", className: "too-tired" },
    { hint: "If your stamina gets to 12 or more, you'll be stuck with indigestion until your stamina gets back down to 10.", className: "too-big" },
    { hint: "Watch out for the dog - Not only does he chase your fluffy self, but he eats the food too.", className: "avoid-dog" },
    { hint: "Hit the \u2190 \u2191 \u2192 \u2193 keys on your keyboard to move. On mobile your screen is the button pad, tap it to move.", className: "move-cat" },
    { hint: "Try to last for 60 seconds!", className: 'time-limit' },
    { hint: "Ready?", className: 'get-ready' }
];


export default class Hints extends Component {

    static propTypes = {
    }

    state = {
        hintIndex: 0,
    }

    componentDidMount() {
        this.getHint(0);

        this.intervalID = setInterval(() => {
            this.getHint(1);
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    getHint = increment => {
        const newIndex = this.state.hintIndex + increment,
            nextHint = hints[newIndex];

        if (newIndex === hints.length)
            clearInterval(this.intervalID);

        if (nextHint)
            this.setState({
                ...this.state, 
                currentHint: hints[newIndex],
                hintIndex: newIndex
            });
    }

    render() {
        const { currentHint } = this.state;

        return (
            <div className={`hints ${currentHint && currentHint.className}`}>

                <div className="hints__message">{currentHint && currentHint.hint}</div>

                <div className="hints__controls">
                    <button className="" onClick={()=>{this.getHint(-1)}}>Previous</button>
                    <button className="" onClick={()=>{this.getHint(1)}}>Next</button>
                    <button className="" onClick={()=>{this.getHint(1)}}>Hide</button>
                </div>
            </div>
        );
    };
}



